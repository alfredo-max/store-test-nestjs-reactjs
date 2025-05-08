import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPaymentStatusRequest } from '../../services/paymentService';

interface PollResponse {
  status: 'PENDING' | 'APPROVED' | 'DECLINED';
}

export const pollPaymentStatus = createAsyncThunk<PollResponse, string>(
    'payment/pollPaymentStatus',
    async (transactionId, thunkAPI) => {
      try {
        const status = await getPaymentStatusRequest(transactionId);
        return status;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message ?? 'Error al consultar el estado del pago');
      }
    }
  );