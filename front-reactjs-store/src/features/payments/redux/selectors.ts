import { RootState } from '../../../app/store';

export const selectAcceptanceTokens = (state: RootState) => state.payment.acceptanceTokens;
export const selectCardToken = (state: RootState) => state.payment.cardToken;
export const selectTransactionId = (state: RootState) => state.payment.transactionId;
export const selectPaymentStatus = (state: RootState) => state.payment.paymentStatus;
export const selectPaymentError = (state: RootState) => state.payment.error;
export const selectIsLoading = (state: RootState) => state.payment.isLoading;