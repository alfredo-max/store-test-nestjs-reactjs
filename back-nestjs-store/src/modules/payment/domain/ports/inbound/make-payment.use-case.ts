import { PaymentPayload } from "../../model/payment-payload";


export interface MakePaymentUseCase {
  execute(paymentPayload:PaymentPayload): Promise<string>;
}