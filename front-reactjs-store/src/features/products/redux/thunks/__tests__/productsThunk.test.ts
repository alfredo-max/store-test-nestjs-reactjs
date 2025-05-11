import { describe, it, expect, vi} from 'vitest';
import { fetchProducts } from '../productsThunk';
import { Product } from '../../../models/Product';
import * as productService from '../../../services/productService';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../../slices/productsSlice';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Producto 1',
    price: 10,
    category: 'Categoría 1',
    description: 'Descripción 1',
    urlImage: 'https://example.com/img1.jpg',
    stock: 5
  },
  {
    id: 2,
    title: 'Producto 2',
    price: 20,
    category: 'Categoría 2',
    description: 'Descripción 2',
    urlImage: 'https://example.com/img2.jpg',
    stock: 3
  }
];

describe('fetchProducts thunk', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('dispatches fulfilled action when API call succeeds', async () => {
    vi.spyOn(productService, 'getAllProducts').mockResolvedValue(mockProducts);

    const store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });

    await store.dispatch(fetchProducts());
    const state = store.getState().products;

    expect(state.products).toEqual(mockProducts);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('dispatches rejected action when API call fails', async () => {
    vi.spyOn(productService, 'getAllProducts').mockRejectedValue(new Error('API error'));

    const store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });

    await store.dispatch(fetchProducts());
    const state = store.getState().products;

    expect(state.products).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('API error');
  });
});
