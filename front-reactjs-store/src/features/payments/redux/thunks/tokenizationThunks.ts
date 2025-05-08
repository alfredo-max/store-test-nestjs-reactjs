import { createAsyncThunk } from '@reduxjs/toolkit';
import { tokenizeCardRequest } from '../../services/paymentService';
import { Card } from '../../models/Card';


export const tokenizeCard = createAsyncThunk(
  'payment/tokenizeCard',
  async (cardData:Card, thunkAPI) => {
    try {
      const result = await tokenizeCardRequest(cardData);
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message ?? 'Error al tokenizar la tarjeta');
    }
  }
);