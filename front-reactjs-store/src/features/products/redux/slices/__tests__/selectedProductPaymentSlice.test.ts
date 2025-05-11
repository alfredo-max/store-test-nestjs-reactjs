import { describe, it, expect } from 'vitest';
import reducer, { setSelectedProduct, resetSelectedProduct } from '../selectedProductPaymentSlice';
import { Product } from '../../../models/Product';

const initialState = {
  selectedProduct: null,
};

const mockProduct: Product = {
  id: 1,
  title: 'Producto de prueba',
  price: 100,
  category: 'Electrónica',
  description: 'Un producto de prueba',
  urlImage: 'https://example.com/image.jpg',
  stock: 10
};

describe('selectedProductPaymentSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setSelectedProduct', () => {
    const action = setSelectedProduct(mockProduct);
    const state = reducer(initialState, action);
    expect(state.selectedProduct).toEqual(mockProduct);
  });

  it('should handle resetSelectedProduct', () => {
    const stateWithProduct = { selectedProduct: mockProduct };
    const action = resetSelectedProduct();
    const state = reducer(stateWithProduct, action);
    expect(state.selectedProduct).toBeNull();
  });
});
