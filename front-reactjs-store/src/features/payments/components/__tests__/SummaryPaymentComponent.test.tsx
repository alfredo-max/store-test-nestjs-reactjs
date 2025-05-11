import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SummaryPaymentComponent from '../SummaryPaymentComponent';
import { Charge } from '../../enums/chargeEnum';

const mockStore = configureStore([]);

const mockProduct = {
  id: 1,
  name: 'Producto Test',
  price: 5000,
};

describe('SummaryPaymentComponent', () => {
  it('renderiza correctamente los textos y valores', () => {
    const store = mockStore({
      selectedProductPayment: {
        selectedProduct: mockProduct,
      },
    });
    render(
      <Provider store={store}>
        <SummaryPaymentComponent onBack={vi.fn()} onContinue={vi.fn()} />
      </Provider>
    );
    expect(screen.getByText('Resumen de tu pago')).toBeInTheDocument();
    expect(screen.getByText('Monto del producto:')).toBeInTheDocument();
    expect(screen.getByText('Comisión base:')).toBeInTheDocument();
    expect(screen.getByText('Envío:')).toBeInTheDocument();
    expect(screen.getByText('Total a pagar:')).toBeInTheDocument();
    expect(screen.getByText('Confirmar y pagar')).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toLocaleString('es-CO')}`)).toBeInTheDocument();
    expect(screen.getByText(`$${Charge.BASE.toLocaleString('es-CO')}`)).toBeInTheDocument();
    expect(screen.getByText(`$${Charge.SHIPPING.toLocaleString('es-CO')}`)).toBeInTheDocument();
    const total = mockProduct.price + Charge.BASE + Charge.SHIPPING;
    expect(screen.getByText(`$${total.toLocaleString('es-CO')}`)).toBeInTheDocument();
  });

  it('llama a onBack cuando se hace click en el botón de volver', () => {
    const store = mockStore({
      selectedProductPayment: {
        selectedProduct: mockProduct,
      },
    });
    const onBack = vi.fn();
    render(
      <Provider store={store}>
        <SummaryPaymentComponent onBack={onBack} onContinue={vi.fn()} />
      </Provider>
    );
    const backButton = screen.getByTestId('back-arrow');
    fireEvent.click(backButton);
    expect(onBack).toHaveBeenCalled();
  });

  it('llama a onContinue cuando se hace click en Confirmar y pagar', () => {
    const store = mockStore({
      selectedProductPayment: {
        selectedProduct: mockProduct,
      },
    });
    const onContinue = vi.fn();
    render(
      <Provider store={store}>
        <SummaryPaymentComponent onBack={vi.fn()} onContinue={onContinue} />
      </Provider>
    );
    const continueButton = screen.getByText('Confirmar y pagar');
    fireEvent.click(continueButton);
    expect(onContinue).toHaveBeenCalled();
  });

  it('muestra $0 si no hay producto seleccionado', () => {
    const store = mockStore({
      selectedProductPayment: {
        selectedProduct: null,
      },
    });
    render(
      <Provider store={store}>
        <SummaryPaymentComponent onBack={vi.fn()} onContinue={vi.fn()} />
      </Provider>
    );
    expect(screen.getByText('$0')).toBeInTheDocument();
    const total = Charge.BASE + Charge.SHIPPING;
    expect(screen.getByText(`$${total.toLocaleString('es-CO')}`)).toBeInTheDocument();
  });
});
