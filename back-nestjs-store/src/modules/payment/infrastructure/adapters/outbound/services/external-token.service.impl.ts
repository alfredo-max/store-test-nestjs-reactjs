import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ExternalTokenService } from 'src/modules/payment/domain/ports/outbound/external-token.service';
import { AcceptanceTokens } from 'src/modules/payment/domain/model/acceptance-tokens';
import { PresignedToken } from 'src/modules/payment/domain/model/presigned-token.model';
import { Injectable } from '@nestjs/common';
import { PaymentPayload } from 'src/modules/payment/domain/model/payment-payload';
import { v4 as uuidv4 } from 'uuid';
import { Charge } from 'src/modules/payment/domain/enum/charges.enum';
import * as crypto from 'crypto';

@Injectable()
export class ExternalTokenServiceImpl implements ExternalTokenService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAcceptanceTokens(): Promise<AcceptanceTokens> {
   const publicKey = this.configService.get<string>('PUB_KEY');
    
    const response = await firstValueFrom(
      this.httpService.get(`https://api-sandbox.co.uat.wompi.dev/v1/merchants/${publicKey}`),
    );

    const { presigned_acceptance, presigned_personal_data_auth } = response.data.data;
    return new AcceptanceTokens(
      new PresignedToken(
        presigned_acceptance.acceptance_token,
        presigned_acceptance.permalink,
        presigned_acceptance.type,
      ),
      new PresignedToken(
        presigned_personal_data_auth.acceptance_token,
        presigned_personal_data_auth.permalink,
        presigned_personal_data_auth.type,
      ),
    );
  }

  async makePayment(paymentPayload: PaymentPayload): Promise<string> {
    const integrityKey = this.configService.get<string>('INTEGRITY_KEY');
    const prvKey = this.configService.get<string>('PRV_KEY');
    paymentPayload.amountInCents+=Charge.BASE+Charge.SHIPPING
    paymentPayload.reference = uuidv4();
    const plainText = `${paymentPayload.reference}${paymentPayload.amountInCents}${paymentPayload.currency}${integrityKey}`;
    const hash = crypto.createHash('sha256').update(plainText).digest('hex');
      
    const adaptedPayload = {
      acceptance_token: paymentPayload.acceptanceToken,
      accept_personal_auth: paymentPayload.acceptPersonalAuth,
      amount_in_cents: paymentPayload.amountInCents,
      currency: paymentPayload.currency,
      customer_email: paymentPayload.customerEmail,
      payment_method: {
        type: paymentPayload.paymentMethod.type,
        installments: paymentPayload.paymentMethod.installments,
        token: paymentPayload.paymentMethod.token,
      },
      reference: paymentPayload.reference,
      signature:hash
    };
  
    const response = await firstValueFrom(
      this.httpService.post(
        'https://api-sandbox.co.uat.wompi.dev/v1/transactions',
        adaptedPayload,
        {
          headers: {
            Authorization: `Bearer ${prvKey}`,
          },
        }
      )
    );
    return response.data.data.id;
  }

  async statusPayment(id: string): Promise<string> {
    const prvKey = this.configService.get<string>('PRV_KEY');

    const response = await firstValueFrom(
      this.httpService.get(
        `https://api-sandbox.co.uat.wompi.dev/v1/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${prvKey}`,
          },
        }
      ),
    );

    return response.data.data.status
  }


}