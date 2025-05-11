import { describe, it, expect, vi, afterEach } from 'vitest';
import { pollPaymentStatus } from '../pollingThunks';
import * as paymentService from '../../../services/paymentService';
import { PaymentStatusEnum } from '../../../enums/PaymentStatusEnum';

vi.mock('../../../services/paymentService');
const mockedGetPaymentStatusRequest = paymentService.getPaymentStatusRequest as unknown as ReturnType<typeof vi.fn>;

describe('pollPaymentStatus thunk', () => {
  const transactionId = '1234';
  const dispatch = vi.fn();
  const getState = vi.fn();
  const rejectWithValue = vi.fn((v) => v);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe retornar un estado válido', async () => {
    mockedGetPaymentStatusRequest.mockResolvedValue(PaymentStatusEnum.APPROVED);
    const thunk = pollPaymentStatus(transactionId);
    const result = await thunk(dispatch, getState, { rejectWithValue } as any);
    expect(result.payload).toBe(PaymentStatusEnum.APPROVED);
    expect(result.type).toContain('fulfilled');
  });

  it('debe rechazar si el estado es desconocido', async () => {
    mockedGetPaymentStatusRequest.mockResolvedValue('UNKNOWN_STATUS');
    const thunk = pollPaymentStatus(transactionId);
    const result = await thunk(dispatch, getState, { rejectWithValue } as any);
    expect(result.payload).toBe('Estado de pago desconocido');
    expect(result.type).toContain('rejected');
  });

  it('debe rechazar si ocurre un error en la petición', async () => {
    mockedGetPaymentStatusRequest.mockRejectedValue({ response: { data: { message: 'Error de red' } } });
    const thunk = pollPaymentStatus(transactionId);
    const result = await thunk(dispatch, getState, { rejectWithValue } as any);
    expect(result.payload).toBe('Error de red');
    expect(result.type).toContain('rejected');
  });
});
