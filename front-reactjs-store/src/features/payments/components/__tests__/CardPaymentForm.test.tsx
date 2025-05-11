import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import CardPaymentForm from '../CardPaymentForm';
import { store } from '../../../../app/store';

vi.mock('../hooks/usePayment', () => ({
  usePayment: () => ({
    acceptanceTokens: {
      presigned_acceptance: { permalink: 'https://fake-link/acceptance' },
      presigned_personal_data_auth: { permalink: 'https://fake-link/personal-data' },
    },
  }),
}));

describe('CardPaymentForm', () => {
  const onBackMock = vi.fn();
  const onContinueMock = vi.fn();

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <CardPaymentForm onBack={onBackMock} onContinue={onContinueMock} />
      </Provider>
    );

  it('correctly renders the title', () => {
    renderComponent();
    expect(screen.getByText(/Paga con tarjeta/i)).toBeInTheDocument();
  });

  it('displays error if number field is empty', async () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Pagar/i));
    expect(await screen.findByText(/El número es obligatorio/)).toBeInTheDocument();
  });

  it('calls onContinue if the form is valid', async () => {
    renderComponent();

    fireEvent.input(screen.getByPlaceholderText(/••••/), {
      target: { value: '1234 5678 9012 3456' },
    });

    fireEvent.change(screen.getByDisplayValue('Mes'), {
      target: { value: '01' },
    });
    fireEvent.change(screen.getByDisplayValue('Año'), {
      target: { value: '30' },
    });

    fireEvent.input(screen.getByPlaceholderText('123'), {
      target: { value: '123' },
    });

    fireEvent.input(screen.getByPlaceholderText(/Como aparece en la tarjeta/), {
      target: { value: 'Juan Pérez' },
    });

    fireEvent.change(screen.getByDisplayValue('Tipo'), {
      target: { value: 'CC' },
    });

    fireEvent.input(screen.getByPlaceholderText(/Ingresa tu documento/), {
      target: { value: '123456789' },
    });

    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    fireEvent.click(screen.getAllByRole('checkbox')[1]);

    fireEvent.click(screen.getByText(/Pagar/i));

    await waitFor(() => {
      expect(onContinueMock).toHaveBeenCalled();
    });
  });
});
