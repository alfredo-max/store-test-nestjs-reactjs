import { describe, it, expect, vi, afterEach } from 'vitest';
import { makePayment } from '../transactionThunks';
import * as paymentService from '../../../services/paymentService';
import { PaymentPayload } from '../../../models/PaymentPayload';

vi.mock('../../../services/paymentService');
const mockedMakePaymentRequest = paymentService.makePaymentRequest as unknown as ReturnType<typeof vi.fn>;

describe('makePayment thunk', () => {
  const payload: PaymentPayload = {
    acceptanceToken: 'token',
    acceptPersonalAuth: 'yes',
    amountInCents: 1000,
    currency: 'COP',
    signature: 'sig',
    customerEmail: 'test@example.com',
    paymentMethod: { type: 'CARD', installments: 1, token: 'tok_123' },
    reference: 'ref123',
  };
  const dispatch = vi.fn();
  const getState = vi.fn();
  const rejectWithValue = vi.fn((v) => v);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe retornar el resultado al pagar correctamente', async () => {
    const mockResult = 'Pago exitoso';
    mockedMakePaymentRequest.mockResolvedValue(mockResult);
    const thunk = makePayment(payload);
    const result = await thunk(dispatch, getState, { rejectWithValue } as any);
    expect(result.payload).toBe(mockResult);
    expect(result.type).toContain('fulfilled');
  });

  it('debe rechazar con mensaje específico si la API retorna error con mensaje', async () => {
    mockedMakePaymentRequest.mockRejectedValue({ response: { data: { message: 'Saldo insuficiente' } } });
    const thunk = makePayment(payload);
    const result = await thunk(dispatch, getState, { rejectWithValue } as any);
    expect(result.payload).toBe('Saldo insuficiente');
    expect(result.type).toContain('rejected');
  });

  it('debe rechazar con mensaje genérico si no hay mensaje específico', async () => {
    mockedMakePaymentRequest.mockRejectedValue({});
    const thunk = makePayment(payload);
    const result = await thunk(dispatch, getState, { rejectWithValue } as any);
    expect(result.payload).toBe('Error al procesar el pago');
    expect(result.type).toContain('rejected');
  });
});
