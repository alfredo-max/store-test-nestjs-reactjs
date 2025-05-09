import { AcceptanceTokens } from "../../model/acceptance-tokens";
import { PaymentPayload } from "../../model/payment-payload";

export interface ExternalTokenService {
  getAcceptanceTokens(): Promise<AcceptanceTokens>;
  makePayment(paymentPayload:PaymentPayload):Promise<string>
}