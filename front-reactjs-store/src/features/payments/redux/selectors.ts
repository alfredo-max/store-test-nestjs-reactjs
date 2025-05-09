import { RootState } from '../../../app/store';
import { AcceptanceTokens } from '../models/AcceptanceTokens';
import { CardFormData } from '../models/CardFormData';
import { UserInfo } from '../models/UserInfo';

export const selectAcceptanceTokens = (state: RootState): AcceptanceTokens | null => state.payment.acceptanceTokens;
export const selectCardToken = (state: RootState): string | null => state.payment.cardToken;
export const selectTransactionId = (state: RootState): string | null => state.payment.transactionId;
export const selectPaymentStatus = (state: RootState) => state.payment.paymentStatus;
export const selectPaymentError = (state: RootState): string | null => state.payment.error;
export const selectIsLoading = (state: RootState): boolean => state.payment.isLoading;
export const selectError = (state: RootState): string | null => state.payment.error;
// ----------formPayment
export const selectUser = (state: RootState): UserInfo | null => state.formPayment.userInfo;
export const selectCard = (state: RootState): CardFormData | null => state.formPayment.cardInfo;