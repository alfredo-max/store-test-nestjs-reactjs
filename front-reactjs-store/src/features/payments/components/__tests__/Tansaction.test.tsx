import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Transaction from '../Tansaction';
import { PaymentStatusEnum } from '../../enums/PaymentStatusEnum';
import * as usePaymentHook from '../../hooks/usePayment';

vi.mock('../../hooks/usePayment', () => ({
  usePayment: vi.fn()
}));

vi.mock('react-icons/fa', () => ({
  FaExclamationCircle: () => <div data-testid="error-icon">Error Icon</div>
}));

describe('Transaction Component', () => {
  const mockOnRetry = vi.fn();
  const mockOnBack = vi.fn();
  
  const mockProduct = {
    id: 1,
    title: 'Producto Test',
    price: 100,
    description: 'Descripción test',
    category: 'test',
    image: 'test.jpg'
  };

  const mockCardInfo = {
    cardNumber: '4242424242424242',
    installments: '3'
  };

  const createMockStore = (initialState = {}) => {
    return configureStore({
      reducer: {
        formPayment: (state = { cardInfo: mockCardInfo }) => state,
        selectedProductPayment: (state = { selectedProduct: mockProduct }) => state
      },
      preloadedState: initialState
    });
  };

  const renderComponent = (paymentStatus = PaymentStatusEnum.PENDING, error: string | null = null) => {
    vi.mocked(usePaymentHook.usePayment).mockReturnValue({
      acceptanceTokens: null,
      cardToken: null,
      transactionId: null,
      paymentStatus,
      paymentError: null,
      error,
      loadAcceptanceTokens: vi.fn(),
      tokenizeUserCard: vi.fn(),
      initiatePayment: vi.fn(),
      startPollPaymentStatus: vi.fn(),
      resetPayment: vi.fn(),
      setStatus: vi.fn(),
      isPaying: false,
      userForm: null,
      cardForm: null
    });

    return render(
      <Provider store={createMockStore()}>
        <Transaction onRetry={mockOnRetry} onBack={mockOnBack} />
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería mostrar el estado de procesamiento', () => {
    renderComponent(PaymentStatusEnum.PENDING);
    expect(screen.getByText('Procesando...')).toBeInTheDocument();
  });

  it('debería mostrar el estado de pago exitoso', () => {
    renderComponent(PaymentStatusEnum.APPROVED);
    
    expect(screen.getByText('¡Pago exitoso!')).toBeInTheDocument();
    expect(screen.getByText('Producto:')).toBeInTheDocument();
    expect(screen.getByText('Total pagado:')).toBeInTheDocument();
    expect(screen.getByText('Tarjeta:')).toBeInTheDocument();
    expect(screen.getByText('Cuotas:')).toBeInTheDocument();
    expect(screen.getByText('Volver')).toBeInTheDocument();
  });

  it('debería mostrar el estado de error', () => {
    const errorMessage = 'Error de pago';
    renderComponent(PaymentStatusEnum.ERROR, errorMessage);
    
    expect(screen.getByText('Lo sentimos, ocurrió un error al procesar tu pago.')).toBeInTheDocument();
    expect(screen.getByText('Por favor, verifica los datos o intenta nuevamente.')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText('Reintentar')).toBeInTheDocument();
  });

  it('debería llamar a onRetry cuando se hace clic en el botón Reintentar', () => {
    renderComponent(PaymentStatusEnum.ERROR);
    fireEvent.click(screen.getByText('Reintentar'));
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('debería llamar a onBack cuando se hace clic en el botón Volver', () => {
    renderComponent(PaymentStatusEnum.APPROVED);
    fireEvent.click(screen.getByText('Volver'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('debería mostrar el estado desconocido cuando el estado no es válido', () => {
    renderComponent('INVALID_STATUS' as PaymentStatusEnum);
    expect(screen.getByText(/Estado de pago desconocido/)).toBeInTheDocument();
    expect(screen.getByText('Por favor, comunícate con soporte.')).toBeInTheDocument();
  });

  it('no debería mostrar la sección de cuotas cuando installments es 1', () => {
    const store = createMockStore({
      formPayment: {
        cardInfo: {
          ...mockCardInfo,
          installments: '1'
        }
      }
    });

    render(
      <Provider store={store}>
        <Transaction onRetry={mockOnRetry} onBack={mockOnBack} />
      </Provider>
    );

    expect(screen.queryByText('Cuotas:')).not.toBeInTheDocument();
  });
});
