import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductList from '../ProductList';

vi.mock('../ProductCard', () => ({
  __esModule: true,
  default: ({ product }: any) => <div data-testid="product-card">{product.title}</div>,
}));

vi.mock('../../redux/thunks/productsThunk', () => ({
  fetchProducts: () => ({ type: 'FETCH_PRODUCTS' }),
}));

const mockStore = configureStore([]);

describe('ProductList', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      products: {
        products: [],
        loading: false,
        error: null,
      },
    });
    store.dispatch = vi.fn();
  });

  it('despacha fetchProducts al montar', () => {
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'FETCH_PRODUCTS' });
  });

  it('muestra mensaje de carga si loading es true', () => {
    store = mockStore({
      products: {
        products: [],
        loading: true,
        error: null,
      },
    });
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );
    expect(screen.getByText('Cargando productos...')).toBeInTheDocument();
  });

  it('muestra mensaje de error si error existe', () => {
    store = mockStore({
      products: {
        products: [],
        loading: false,
        error: 'Error de carga',
      },
    });
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );
    expect(screen.getByText('Error de carga')).toBeInTheDocument();
  });

  it('renderiza los productos usando ProductCard', () => {
    const products = [
      { id: 1, title: 'Prod 1' },
      { id: 2, title: 'Prod 2' },
    ];
    store = mockStore({
      products: {
        products,
        loading: false,
        error: null,
      },
    });
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );
    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Prod 1');
    expect(cards[1]).toHaveTextContent('Prod 2');
  });
});
