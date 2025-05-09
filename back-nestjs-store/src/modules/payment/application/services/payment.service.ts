import { Inject, Injectable } from '@nestjs/common';
import { GetAcceptanceTokensUseCase } from '../../domain/ports/inbound/get-acceptance-tokens.use-case';
import { AcceptanceTokens } from '../../domain/model/acceptance-tokens';
import { PaymentPayload } from '../../domain/model/payment-payload';
import { MakePaymentUseCase } from '../../domain/ports/inbound/make-payment.use-case';
import { StatusTransactionUseCase } from '../../domain/ports/inbound/status-transaction.use-case';

@Injectable()
export class PaymentService {

    constructor(
        @Inject('GetAcceptanceTokensUseCase')
        private readonly getAcceptanceTokensUseCase: GetAcceptanceTokensUseCase,
        @Inject('MakePaymentUseCase')
        private readonly makePaymentUseCase: MakePaymentUseCase,
        @Inject('StatusTransactionUseCase')
        private readonly statusTransactionUseCase: StatusTransactionUseCase,
    ) {}

    async getAcceptanceTokens(): Promise<AcceptanceTokens> {
        return this.getAcceptanceTokensUseCase.execute();
    }

    async makePayment(paymentPayload:PaymentPayload): Promise<string> {
        return this.makePaymentUseCase.execute(paymentPayload);
    }

    async statusPayment(id: string): Promise<string>{
        return this.statusTransactionUseCase.execute(id);
    }

}



