import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { selectAcceptanceTokens, selectCard, selectCardToken, selectIsLoading, selectPaymentError, selectPaymentStatus, selectTransactionId, selectUser } from '../redux/selectors';
import { fetchAcceptanceTokens } from '../redux/thunks/acceptanceThunks';
import { tokenizeCard } from '../redux/thunks/tokenizationThunks';
import { pollPaymentStatus } from '../redux/thunks/pollingThunks';
import { Card } from '../models/Card';
import { PaymentPayload } from '../models/PaymentPayload';
import { makePayment } from '../redux/thunks/transactionThunks';
import { resetPaymentState } from '../redux/slices/slices/paymentSlice';



export const usePayment = () => {
  const dispatch: AppDispatch = useDispatch();
  const acceptanceTokens = useSelector((state: RootState) => selectAcceptanceTokens(state));
  const cardToken = useSelector((state: RootState) => selectCardToken(state));
  const transactionId = useSelector((state: RootState) => selectTransactionId(state));
  const paymentStatus = useSelector((state: RootState) => selectPaymentStatus(state));
  const paymentError = useSelector((state: RootState) => selectPaymentError(state));
  const isPaying = useSelector((state: RootState) => selectIsLoading(state));
  
  const loadAcceptanceTokens = () => dispatch(fetchAcceptanceTokens());
  const tokenizeUserCard = (cardData: Card) => dispatch(tokenizeCard(cardData));
  const initiatePayment = (paymentPayload: PaymentPayload) => dispatch(makePayment(paymentPayload));
  const startPollPaymentStatus = (transactionId:string) => dispatch(pollPaymentStatus(transactionId));
  const resetPayment = () => dispatch(resetPaymentState());

  //--------------FormPayment-----------
  const userForm = useSelector((state: RootState) => selectUser(state));
  const cardForm = useSelector((state: RootState) => selectCard(state));


  return {
    acceptanceTokens,
    cardToken,
    transactionId,
    paymentStatus,
    paymentError,
    loadAcceptanceTokens,
    tokenizeUserCard,
    initiatePayment,
    startPollPaymentStatus,
    resetPayment,
    isPaying,
    userForm,
    cardForm
  };
};