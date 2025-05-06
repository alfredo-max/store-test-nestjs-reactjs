import axios from 'axios';

const PAYMENT_API = 'https://api-sandbox.co.uat.wompi.dev/v1';

export const tokenizeCard = async (cardData: {
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
  card_holder: string;
}) => {
  const response = await axios.post(`${PAYMENT_API}/tokens/cards`, cardData);
  return response.data;
};
