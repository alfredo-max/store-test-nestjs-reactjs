import { Inject, Injectable } from "@nestjs/common";
import { MakePaymentUseCase } from "../../domain/ports/inbound/make-payment.use-case";
import { ExternalTokenService } from "../../domain/ports/outbound/external-token.service";
import { PaymentPayload } from "../../domain/model/payment-payload";


@Injectable()
export class MakePaymentUseCaseImpl implements MakePaymentUseCase {
  constructor(
    @Inject('ExternalTokenService')
    private readonly externalService: ExternalTokenService) {}

  async execute(paymentPayload:PaymentPayload): Promise<string> {
    return await this.externalService.makePayment(paymentPayload);
  }
}