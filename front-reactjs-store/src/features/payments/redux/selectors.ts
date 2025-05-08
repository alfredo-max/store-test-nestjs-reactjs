import { RootState } from '../../../app/store';
import { AcceptanceTokens } from '../models/AcceptanceTokens';

export const selectAcceptanceTokens = (state: RootState): AcceptanceTokens | null => state.payment.acceptanceTokens;
export const selectCardToken = (state: RootState): string | null => state.payment.cardToken;
export const selectTransactionId = (state: RootState): string | null => state.payment.transactionId;
export const selectPaymentStatus = (state: RootState) => state.payment.paymentStatus;
export const selectPaymentError = (state: RootState): string | null => state.payment.error;
export const selectIsLoading = (state: RootState): boolean => state.payment.isLoading;