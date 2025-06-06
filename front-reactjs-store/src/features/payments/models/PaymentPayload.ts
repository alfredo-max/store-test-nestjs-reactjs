export interface PaymentPayload {
    acceptanceToken:string;
    acceptPersonalAuth:string;
    amountInCents:number;
    currency:string;
    signature:string;
    customerEmail:string;
    paymentMethod:PaymentMethod;
    reference:string;
  }

interface PaymentMethod {
    type:string;
    installments:number;
    token:string;
}