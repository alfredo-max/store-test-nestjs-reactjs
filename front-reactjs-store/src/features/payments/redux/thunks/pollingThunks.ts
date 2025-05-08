import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPaymentStatusRequest } from '../../services/paymentService';
import { PaymentStatusEnum } from '../../enums/PaymentStatusEnum';


export const pollPaymentStatus = createAsyncThunk<PaymentStatusEnum, string>(
  'payment/pollPaymentStatus',
  async (transactionId, thunkAPI) => {
    try {
      const status: string = await getPaymentStatusRequest(transactionId);
      
      if (Object.values(PaymentStatusEnum).includes(status as PaymentStatusEnum)) {
        return status as PaymentStatusEnum;
      } else {
        return thunkAPI.rejectWithValue('Estado de pago desconocido');
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message ?? 'Error al consultar el estado del pago');
    }
  }
);