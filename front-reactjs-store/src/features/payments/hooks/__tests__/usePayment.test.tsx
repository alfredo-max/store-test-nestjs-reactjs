import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { UserInfoForm } from '../../components/UserInfoForm';
import formPaymentReducer from '../../redux/slices/slices/formPaymentSlice';

vi.mock('../../hooks/usePayment', () => ({
  usePayment: () => ({
    loadAcceptanceTokens: vi.fn(),
  }),
}));

describe('UserInfoForm', () => {
  const mockOnContinue = vi.fn();
  const mockOnBack = vi.fn();
  
  const renderComponent = (initialState = {}) => {
    const store = configureStore({
      reducer: {
        formPayment: formPaymentReducer,
      },
      preloadedState: {
        formPayment: {
          userInfo: null,
          cardInfo: null,
          ...initialState,
        },
      },
    });

    return render(
      <Provider store={store}>
        <UserInfoForm onContinue={mockOnContinue} onBack={mockOnBack} />
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it('debería llamar a onContinue cuando el formulario es válido', async () => {
    renderComponent();
    
    const emailInput = screen.getByPlaceholderText('correo@ejemplo.com');
    const nameInput = screen.getByPlaceholderText('Nombre completo');
    const phoneInput = screen.getByPlaceholderText('3001234567');
    const submitButton = screen.getByText('Continuar con tu pago');

    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(nameInput, {
      target: { value: 'John Doe' },
    });
    fireEvent.change(phoneInput, {
      target: { value: '3001234567' },
    });

    await act(async () => {
      fireEvent.submit(submitButton);
    });

    expect(mockOnContinue).toHaveBeenCalled();
  });

  it('debería llamar a onBack cuando se hace clic en el botón de retroceso', () => {
    renderComponent();
    
    const backButton = screen.getByText('Ingresa tus datos').previousSibling;
    fireEvent.click(backButton!);

    expect(mockOnBack).toHaveBeenCalled();
  });

  it('debería cargar los datos del usuario si existen en el estado', () => {
    const initialState = {
      userInfo: {
        email: 'test@example.com',
        name: 'John Doe',
        phone: '3001234567',
      },
    };

    renderComponent(initialState);

    expect(screen.getByPlaceholderText('correo@ejemplo.com')).toHaveValue('test@example.com');
    expect(screen.getByPlaceholderText('Nombre completo')).toHaveValue('John Doe');
    expect(screen.getByPlaceholderText('3001234567')).toHaveValue('3001234567');
  });
}); 