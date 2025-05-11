import { describe, it, expect } from 'vitest';
import reducer from '../productsSlice';
import { fetchProducts } from '../../thunks/productsThunk';
import { Product } from '../../../models/Product';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

describe('productsSlice', () => {
  it('debería retornar el estado inicial', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('debería manejar fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('debería manejar fetchProducts.fulfilled', () => {
    const productos: Product[] = [
  {
    id: 1,
    title: 'Producto 1',
    price: 10,
    category: 'Categoría 1',
    description: 'Descripción del producto 1',
    urlImage: 'https://example.com/img1.jpg',
    stock: 5
  },
  {
    id: 2,
    title: 'Producto 2',
    price: 20,
    category: 'Categoría 2',
    description: 'Descripción del producto 2',
    urlImage: 'https://example.com/img2.jpg',
    stock: 3
  }
];
    const action = { type: fetchProducts.fulfilled.type, payload: productos };
    const state = reducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.products).toEqual(productos);
  });

  it('debería manejar fetchProducts.rejected', () => {
    const error = 'Error al obtener productos';
    const action = { type: fetchProducts.rejected.type, payload: error };
    const state = reducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});
