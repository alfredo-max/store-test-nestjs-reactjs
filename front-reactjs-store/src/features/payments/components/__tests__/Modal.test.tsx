import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Modal from '../Modal';
import { Provider } from 'react-redux';
import { store } from '../../../../app/store';


vi.mock('../hooks/usePayment', () => ({
  usePayment: () => ({
    isPaying: false,
  }),
}));

const renderWithProvider = (ui: React.ReactNode) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('Modal', () => {
  const onCloseMock = vi.fn();

  it('no renderiza nada si isOpen es false', () => {
    const { container } = renderWithProvider(
      <Modal isOpen={false} onClose={onCloseMock}>
        <p>Contenido del modal</p>
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renderiza el modal si isOpen es true', () => {
    renderWithProvider(
      <Modal isOpen={true} onClose={onCloseMock}>
        <p>Contenido del modal</p>
      </Modal>
    );
    expect(screen.getByText(/Contenido del modal/)).toBeInTheDocument();
  });

  it('muestra el título si se proporciona', () => {
    renderWithProvider(
      <Modal isOpen={true} onClose={onCloseMock} title="Título de prueba">
        <p>Contenido</p>
      </Modal>
    );
    expect(screen.getByText('Título de prueba')).toBeInTheDocument();
  });

  it('llama a onClose al hacer clic en "Cerrar"', () => {
    renderWithProvider(
      <Modal isOpen={true} onClose={onCloseMock}>
        <p>Contenido</p>
      </Modal>
    );
    fireEvent.click(screen.getByText('Cerrar'));
    expect(onCloseMock).toHaveBeenCalled();
  });
});