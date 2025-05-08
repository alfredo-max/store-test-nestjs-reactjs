import { createAsyncThunk } from '@reduxjs/toolkit';
import { AcceptanceTokens } from '../../models/AcceptanceTokens';
import { getAcceptanceTokenRequest } from '../../services/paymentService';

export const fetchAcceptanceTokens = createAsyncThunk<AcceptanceTokens>(
  'payment/fetchAcceptanceTokens',
  async (_, thunkAPI) => {
    try {
      const tokens = await getAcceptanceTokenRequest();
      return tokens;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message ?? 'Error al obtener tokens de aceptación');
    }
  }
);