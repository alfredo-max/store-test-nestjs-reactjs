import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PaymentFlow from '../PaymentFlow';
import * as usePaymentModule from '../../hooks/usePayment';

vi.mock('../Tansaction', () => ({
  __esModule: true,
  default: ({ onRetry, onBack }: any) => (
    <div>
      <button onClick={onRetry}>Retry</button>
      <button onClick={onBack}>Back</button>
      <span>Transaction Mock</span>
    </div>
  ),
}));

describe('PaymentFlow', () => {
  const store = configureStore({ reducer: () => ({ selectedProductPayment: { selectedProduct: { price: 10000 } } }) });

  beforeEach(() => {
    return vi.spyOn(usePaymentModule, 'usePayment').mockReturnValue({
        acceptanceTokens: {
            presigned_acceptance: {
                acceptance_token: 'token1',
                permalink: 'https://example.com/acceptance',
                type: 'acceptance',
            },
            presigned_personal_data_auth: {
                acceptance_token: 'token2',
                permalink: 'https://example.com/personal',
                type: 'personal_data_auth',
            }
        },
        userForm: { name: 'John', email: 'john@example.com', phone: '1234567890' },
        cardForm: {
            cardNumber: '4111 1111 1111 1111',
            cvc: '123',
            expMonth: '12',
            expYear: '30',
            installments: '1',
            nameOnCard: 'Test User',
            idType: 'DNI',
            idNumber: '12345678',
            acceptedTerms: true,
            acceptedDataPolicy: true,
        },
        tokenizeUserCard: vi.fn().mockReturnValue({ unwrap: () => Promise.resolve('tokentest') }),
        initiatePayment: vi.fn().mockReturnValue({ unwrap: () => Promise.resolve('paymentId') }),
        startPollPaymentStatus: vi.fn().mockReturnValue({ unwrap: () => Promise.resolve('APPROVED') }),
        setStatus: vi.fn(),
        cardToken: null,
        transactionId: null,
        paymentStatus: null,
        paymentError: null,
        loadAcceptanceTokens: vi.fn(),
        resetPayment: vi.fn(),
        isPaying: false,
        error: null
    });
  });

  it('renderiza PaymentFlow y llama callbacks', async () => {
    const onRetry = vi.fn();
    const onBack = vi.fn();
    render(
      <Provider store={store}>
        <PaymentFlow onRetry={onRetry} onBack={onBack} />
      </Provider>
    );
    expect(screen.getByText('Transaction Mock')).toBeInTheDocument();
    screen.getByText('Retry').click();
    screen.getByText('Back').click();
    expect(onRetry).toHaveBeenCalled();
    expect(onBack).toHaveBeenCalled();
  });
});
