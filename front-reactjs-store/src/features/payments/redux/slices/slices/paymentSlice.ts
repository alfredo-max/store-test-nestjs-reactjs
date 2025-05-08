import { createSlice } from '@reduxjs/toolkit';
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
  paymentStatus: null,
  isLoading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // get acceptance tokens
      .addCase(fetchAcceptanceTokens.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAcceptanceTokens.fulfilled, (state, action) => {
        state.acceptanceTokens = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAcceptanceTokens.rejected, (state, action) => {
        state.error = action.error.message || 'Error al obtener los tokens';
        state.isLoading = false;
      })

      // Tokenize card
      .addCase(tokenizeCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(tokenizeCard.fulfilled, (state, action) => {
        state.cardToken = action.payload;
        state.isLoading = false;
      })
      .addCase(tokenizeCard.rejected, (state, action) => {
        state.error = action.error.message || 'Error al tokenizar la tarjeta';
        state.isLoading = false;
      })

      //Make payment
      .addCase(makePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.transactionId = action.payload.transactionId;
        state.isLoading = false;
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.error = action.error.message || 'Error al realizar el pago';
        state.isLoading = false;
      })

      //Consultar estado de pago
      .addCase(pollPaymentStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(pollPaymentStatus.fulfilled, (state, action) => {
        state.paymentStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(pollPaymentStatus.rejected, (state, action) => {
        state.error = action.error.message || 'Error al consultar el estado del pago';
        state.isLoading = false;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
