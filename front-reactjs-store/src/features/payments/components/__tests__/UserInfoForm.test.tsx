import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { UserInfoForm } from '../UserInfoForm';
import formPaymentReducer from '../../redux/slices/slices/formPaymentSlice';

vi.mock('../../hooks/usePayment', () => ({
  usePayment: () => ({
    loadAcceptanceTokens: vi.fn(),
  }),
}));

describe('UserInfoForm', () => {
  const mockOnContinue = vi.fn();
  const mockOnBack = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  const renderComponent = () => {
    const store = configureStore({
      reducer: {
        formPayment: formPaymentReducer,
      },
    });

    return render(
      <Provider store={store}>
        <UserInfoForm onContinue={mockOnContinue} onBack={mockOnBack} />
      </Provider>
    );
  };

  it('debería renderizar el formulario correctamente', () => {
    renderComponent();
    
    expect(screen.getByText('Ingresa tus datos')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('correo@ejemplo.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nombre completo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('3001234567')).toBeInTheDocument();
  });

  it('debería mostrar errores cuando se envían campos vacíos', async () => {
    renderComponent();
    
    const submitButton = screen.getByText('Continuar con tu pago');
    fireEvent.click(submitButton);

    expect(await screen.findByText('El correo es obligatorio')).toBeInTheDocument();
    expect(await screen.findByText('El nombre es obligatorio')).toBeInTheDocument();
    expect(await screen.findByText('El número es obligatorio')).toBeInTheDocument();
  });

  it('debería cargar los datos del usuario si existen en el estado', () => {
    const store = configureStore({
      reducer: {
        formPayment: formPaymentReducer,
      },
      preloadedState: {
        formPayment: {
          userInfo: {
            email: 'test@example.com',
            name: 'John Doe',
            phone: '3001234567',
          },
          cardInfo: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <UserInfoForm onContinue={mockOnContinue} onBack={mockOnBack} />
      </Provider>
    );

    expect(screen.getByPlaceholderText('correo@ejemplo.com')).toHaveValue('test@example.com');
    expect(screen.getByPlaceholderText('Nombre completo')).toHaveValue('John Doe');
    expect(screen.getByPlaceholderText('3001234567')).toHaveValue('3001234567');
  });
});
