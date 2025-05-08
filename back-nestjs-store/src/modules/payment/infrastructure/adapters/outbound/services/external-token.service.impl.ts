import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ExternalTokenService } from 'src/modules/payment/domain/ports/outbound/external-token.service';
import { AcceptanceTokens } from 'src/modules/payment/domain/model/acceptance-tokens';
import { PresignedToken } from 'src/modules/payment/domain/model/presigned-token.model';
import { Injectable } from '@nestjs/common';

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
}
