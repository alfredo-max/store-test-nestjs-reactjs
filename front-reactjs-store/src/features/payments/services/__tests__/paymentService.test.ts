import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

import { 
  tokenizeCardRequest, 
  getAcceptanceTokenRequest, 
  makePaymentRequest, 
  getPaymentStatusRequest 
} from '../paymentService';
import api from '../../../../shared/api/api';
import { API_ENDPOINTS } from '../../../../shared/api/endpoints';

vi.mock('axios');
vi.mock('../../../../shared/api/api', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
    }
  };
});

const mockedAxios = axios as unknown as { post: any, get: any };

const PAYMENT_API = 'https://api-sandbox.co.uat.wompi.dev/v1';
const PUB_KEY = 'test_pub_key';


describe('paymentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (globalThis as any).importMeta = { env: { VITE_PUB_KEY: PUB_KEY } };
  });

  it('tokenizeCardRequest should call axios.post with correct params and return id', async () => {
    const cardData = {
      number: '4111111111111111',
      cvc: '123',
      exp_month: '12',
      exp_year: '2025',
      card_holder: 'Test User'
    };
    mockedAxios.post = vi.fn().mockResolvedValue({ data: { data: { id: 'card_token_id' } } });
    const result = await tokenizeCardRequest(cardData);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${PAYMENT_API}/tokens/cards`,
      cardData,
      expect.objectContaining({ headers: expect.any(Object) })
    );
    expect(result).toBe('card_token_id');
  });

  it('getAcceptanceTokenRequest should call api.get and return data', async () => {
    const mockTokens = { presigned_acceptance: {}, presigned_personal_data_auth: {} };
    (api.get as any).mockResolvedValue({ data: mockTokens });
    const result = await getAcceptanceTokenRequest();
    expect(api.get).toHaveBeenCalledWith(API_ENDPOINTS.PAYMENTS + '/acceptance-tokens');
    expect(result).toBe(mockTokens);
  });

  it('makePaymentRequest should call api.post and return data', async () => {
    const paymentData = { amount: 1000 };
    const mockResponse = { status: 'ok' };
    (api.post as any).mockResolvedValue({ data: mockResponse });
    const result = await makePaymentRequest(paymentData as any);
    expect(api.post).toHaveBeenCalledWith(API_ENDPOINTS.PAYMENTS + '/make-payment', paymentData);
    expect(result).toBe(mockResponse);
  });

  it('getPaymentStatusRequest should call api.get and return data', async () => {
    const transactionId = 'txn_123';
    const mockResponse = { status: 'approved' };
    (api.get as any).mockResolvedValue({ data: mockResponse });
    const result = await getPaymentStatusRequest(transactionId);
    expect(api.get).toHaveBeenCalledWith(API_ENDPOINTS.PAYMENTS + `/status-payment/${transactionId}`);
    expect(result).toBe(mockResponse);
  });
});
