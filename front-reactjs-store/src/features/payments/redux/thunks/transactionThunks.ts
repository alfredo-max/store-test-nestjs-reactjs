import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePaymentRequest } from '../../services/paymentService';
import { PaymentPayload } from '../../models/PaymentPayload';

export const makePayment = createAsyncThunk<string, PaymentPayload>(
  'payment/makePayment',
  async (payload, thunkAPI) => {
    try {
      const result = await makePaymentRequest(payload);
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message ?? 'Error al procesar el pago');
    }
  }
);