export interface PaymentPayload {
    cardToken: string;
    amount: number;
    currency: string;
    acceptanceToken: string;
    userEmail: string;
  }