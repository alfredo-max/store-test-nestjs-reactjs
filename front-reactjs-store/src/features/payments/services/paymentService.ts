import axios from 'axios';
import { AcceptanceTokens } from '../models/AcceptanceTokens';
import { API_ENDPOINTS } from '../../../shared/api/endpoints';
import api from '../../../shared/api/api';
import { PaymentPayload } from '../models/PaymentPayload';


const PAYMENT_API = 'https://api-sandbox.co.uat.wompi.dev/v1';
const PUB_KEY = import.meta.env.VITE_PUB_KEY

export const tokenizeCardRequest = async (cardData: {
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
  card_holder: string;
}) => {
  const response = await axios.post(
    `${PAYMENT_API}/tokens/cards`,
    cardData,
    {
      headers: {
        Authorization: `Bearer ${PUB_KEY}`,
      },
    }
  );
  return response.data.data.id;
};


export const getAcceptanceTokenRequest = async (): Promise<AcceptanceTokens> => {
  const response = await api.get<AcceptanceTokens>(API_ENDPOINTS.PAYMENTS+'/acceptance-tokens');
  return response.data;
};

export const makePaymentRequest = async (paymentData: PaymentPayload) => {
  const response = await api.post(API_ENDPOINTS.PAYMENTS+'/make-payment', paymentData);
  return response.data;
};

export const getPaymentStatusRequest = async (transactionId: string) => {
  const response = await api.get(API_ENDPOINTS.PAYMENTS+`/transaction/${transactionId}/status`);
  return response.data;
};