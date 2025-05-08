import { AcceptanceTokens } from "./AcceptanceTokens";

export interface PaymentState {
    acceptanceTokens: AcceptanceTokens | null;
    cardToken: string | null;
    transactionId: string | null;
    paymentStatus: 'idle' | 'processing' | 'success' | 'failed';
    error: string | null;
  }