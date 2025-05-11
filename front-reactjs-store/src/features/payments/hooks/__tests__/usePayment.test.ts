import { renderHook } from '@testing-library/react';
import { fetchAcceptanceTokens, tokenizeCard, makePayment, pollPaymentStatus, resetPaymentState, setStatusState } from './actions';
import { describe, expect, it, vi } from 'vitest';

// Crea un store mock
const mockStore = {
  getState: () => ({
    payment: {
      acceptanceTokens: 'mockedTokens',
      cardToken: 'mockedCardToken',
      transactionId: 'mockedTransactionId',
      paymentStatus: 'mockedStatus',
      paymentError: 'mockedError',
      isPaying: false,
      error: 'mockedErrorMessage',
      user: { email: 'test@example.com' },
      card: { number: '1234-5678-9876-5432' },
    },
  }),
  dispatch: vi.fn(),
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>{children}</Provider>
);

describe('usePayment', () => {
  it('should return payment state and functions', () => {
    const { result } = renderHook(() => usePayment(), { wrapper });

    // Verifica el estado devuelto por el hook
    expect(result.current.acceptanceTokens).toBe('mockedTokens');
    expect(result.current.cardToken).toBe('mockedCardToken');
    expect(result.current.transactionId).toBe('mockedTransactionId');
    expect(result.current.paymentStatus).toBe('mockedStatus');
    expect(result.current.paymentError).toBe('mockedError');
    expect(result.current.isPaying).toBe(false);
    expect(result.current.error).toBe('mockedErrorMessage');
    expect(result.current.userForm.email).toBe('test@example.com');
    expect(result.current.cardForm.number).toBe('1234-5678-9876-5432');
  });

  it('should dispatch loadAcceptanceTokens when calling loadAcceptanceTokens', async () => {
    const { result } = renderHook(() => usePayment(), { wrapper });

    await act(async () => {
      result.current.loadAcceptanceTokens();
    });

    // Verifica que `dispatch` haya sido llamado correctamente
    expect(mockStore.dispatch).toHaveBeenCalledWith(fetchAcceptanceTokens());
  });

  it('should dispatch tokenizeUserCard when calling tokenizeUserCard', async () => {
    const cardData = { number: '1234-5678-9876-5432' };
    const { result } = renderHook(() => usePayment(), { wrapper });

    await act(async () => {
      result.current.tokenizeUserCard(cardData);
    });

    // Verifica que `dispatch` haya sido llamado correctamente
    expect(mockStore.dispatch).toHaveBeenCalledWith(tokenizeCard(cardData));
  });

  it('should dispatch initiatePayment when calling initiatePayment', async () => {
    const paymentPayload = { amount: 100, currency: 'USD' };
    const { result } = renderHook(() => usePayment(), { wrapper });

    await act(async () => {
      result.current.initiatePayment(paymentPayload);
    });

    // Verifica que `dispatch` haya sido llamado correctamente
    expect(mockStore.dispatch).toHaveBeenCalledWith(makePayment(paymentPayload));
  });

  it('should dispatch startPollPaymentStatus when calling startPollPaymentStatus', async () => {
    const { result } = renderHook(() => usePayment(), { wrapper });

    await act(async () => {
      result.current.startPollPaymentStatus('mockedTransactionId');
    });

    // Verifica que `dispatch` haya sido llamado correctamente
    expect(mockStore.dispatch).toHaveBeenCalledWith(pollPaymentStatus('mockedTransactionId'));
  });

  it('should dispatch resetPayment when calling resetPayment', async () => {
    const { result } = renderHook(() => usePayment(), { wrapper });

    await act(async () => {
      result.current.resetPayment();
    });

    // Verifica que `dispatch` haya sido llamado correctamente
    expect(mockStore.dispatch).toHaveBeenCalledWith(resetPaymentState());
  });

  it('should dispatch setStatus when calling setStatus', async () => {
    const { result } = renderHook(() => usePayment(), { wrapper });

    await act(async () => {
      result.current.setStatus('COMPLETED');
    });

    // Verifica que `dispatch` haya sido llamado correctamente
    expect(mockStore.dispatch).toHaveBeenCalledWith(setStatusState('COMPLETED'));
  });
});