import { describe, it, expect, vi, afterEach } from 'vitest';
import { tokenizeCard } from '../tokenizationThunks';
import * as paymentService from '../../../services/paymentService';
import { Card } from '../../../models/Card';

vi.mock('../../../services/paymentService');
const mockedTokenizeCardRequest = paymentService.tokenizeCardRequest as unknown as ReturnType<typeof vi.fn>;

describe('tokenizeCard thunk', () => {
  const cardData = new Card('4111111111111111', '123', '12', '2025', 'John Doe');
  const dispatch = vi.fn();
  const getState = vi.fn();
  const rejectWithValue = vi.fn((v) => v);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe retornar el resultado al tokenizar correctamente', async () => {
    const mockResult = { token: 'tok_123' };
    mockedTokenizeCardRequest.mockResolvedValue(mockResult);
    const thunk = tokenizeCard(cardData);
    const result = await thunk(dispatch, getState, { rejectWithValue } as any);
    expect(result.payload).toEqual(mockResult);
    expect(result.type).toContain('fulfilled');
  });

  it('debe rechazar con mensaje específico si la API retorna error con mensaje', async () => {
    mockedTokenizeCardRequest.mockRejectedValue({ response: { data: { error: { messages: { number: ['Tarjeta inválida'] } } } } });
    const thunk = tokenizeCard(cardData);
    const result = await thunk(dispatch, getState, { rejectWithValue } as any);
    expect(result.payload).toBe('Tarjeta inválida');
    expect(result.type).toContain('rejected');
  });

  it('debe rechazar con mensaje genérico si no hay mensaje específico', async () => {
    mockedTokenizeCardRequest.mockRejectedValue({});
    const thunk = tokenizeCard(cardData);
    const result = await thunk(dispatch, getState, { rejectWithValue } as any);
    expect(result.payload).toBe('Error al tokenizar la tarjeta');
    expect(result.type).toContain('rejected');
  });
});
