import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchAcceptanceTokens } from '../acceptanceThunks';
import * as paymentService from '../../../services/paymentService';
import { AcceptanceTokens } from '../../../models/AcceptanceTokens';

vi.mock('../../../services/paymentService');
const mockedGetAcceptanceTokenRequest = paymentService.getAcceptanceTokenRequest as unknown as ReturnType<typeof vi.fn>;

describe('fetchAcceptanceTokens thunk', () => {
  const dispatch = vi.fn();
  const getState = vi.fn();
  const rejectWithValue = vi.fn((v) => v);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe retornar los tokens correctamente', async () => {
    const mockTokens: AcceptanceTokens = {
      presigned_acceptance: {
        acceptance_token: 'accept_token',
        permalink: 'test_permalink_1',
        type: 'test_type_1'
      },
      presigned_personal_data_auth: {
        acceptance_token: 'personal_token',
        permalink: 'test_permalink_2',
        type: 'test_type_2'
      },
    };
    mockedGetAcceptanceTokenRequest.mockResolvedValue(mockTokens);
    const thunk = fetchAcceptanceTokens();
    const result = await thunk(dispatch, getState, { rejectWithValue } as any);
    expect(result.payload).toEqual(mockTokens);
    expect(result.type).toContain('fulfilled');
  });

  it('debe rechazar con mensaje específico si la API retorna error con mensaje', async () => {
    mockedGetAcceptanceTokenRequest.mockRejectedValue({ response: { data: { message: 'Error de API' } } });
    const thunk = fetchAcceptanceTokens();
    const result = await thunk(dispatch, getState, { rejectWithValue } as any);
    expect(result.payload).toBe('Error de API');
    expect(result.type).toContain('rejected');
  });

  it('debe rechazar con mensaje genérico si no hay mensaje específico', async () => {
    mockedGetAcceptanceTokenRequest.mockRejectedValue({});
    const thunk = fetchAcceptanceTokens();
    const result = await thunk(dispatch, getState, { rejectWithValue } as any);
    expect(result.payload).toBe('Error al obtener tokens de aceptación');
    expect(result.type).toContain('rejected');
  });
});
