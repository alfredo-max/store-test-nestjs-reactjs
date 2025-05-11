import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AcceptanceTokens } from '../../../models/AcceptanceTokens';
import { fetchAcceptanceTokens } from '../../thunks/acceptanceThunks';
import { tokenizeCard } from '../../thunks/tokenizationThunks';
import { makePayment } from '../../thunks/transactionThunks';
import { pollPaymentStatus } from '../../thunks/pollingThunks';
import { PaymentStatusEnum } from '../../../enums/PaymentStatusEnum';

interface PaymentState {
  acceptanceTokens: AcceptanceTokens | null;
  cardToken: string | null;
  transactionId: string | null;
  paymentStatus: PaymentStatusEnum | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  acceptanceTokens: null,
  cardToken: null,
  transactionId: null,
  paymentStatus: PaymentStatusEnum.NO_STATUS,
  isLoading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.acceptanceTokens=null;
      state.cardToken=null;
      state.transactionId=null;
      state.paymentStatus=PaymentStatusEnum.NO_STATUS;
      state.isLoading=false;
      state.error=null;
    },
    setStatusState: (state, action: PayloadAction<PaymentStatusEnum>) => {
        state.paymentStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get acceptance tokens
      .addCase(fetchAcceptanceTokens.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAcceptanceTokens.fulfilled, (state, action) => {
        state.acceptanceTokens = action.payload;
      })
      .addCase(fetchAcceptanceTokens.rejected, (state, action) => {
        state.paymentStatus=PaymentStatusEnum.ERROR;
        state.error = (action.payload as string) || 'Error al obtener los tokens';
        state.isLoading = false;
      })

      // Tokenize card
      .addCase(tokenizeCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(tokenizeCard.fulfilled, (state, action) => {
        state.cardToken = action.payload;
      })
      .addCase(tokenizeCard.rejected, (state, action) => {
        state.paymentStatus=PaymentStatusEnum.ERROR;
        state.error = (action.payload as string) || 'Error al tokenizar la tarjeta';
        state.isLoading = false;
      })

      //Make payment
      .addCase(makePayment.pending, (state) => {
        state.error = null;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.transactionId = action.payload;
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.paymentStatus=PaymentStatusEnum.ERROR;
        state.error = (action.payload as string) || 'Error al realizar el pago';
        state.isLoading = false;
      })

      //get status transaction
      .addCase(pollPaymentStatus.pending, (state) => {
        state.error = null;
      })
      .addCase(pollPaymentStatus.fulfilled, (state, action) => {
        state.paymentStatus = action.payload;
      })
      .addCase(pollPaymentStatus.rejected, (state, action) => {
        state.paymentStatus=PaymentStatusEnum.ERROR;
        state.error = (action.payload as string) || 'Error al consultar el estado del pago';
        state.isLoading = false;
      });
  },
});

export const { resetPaymentState,setStatusState} = paymentSlice.actions;
export default paymentSlice.reducer;
