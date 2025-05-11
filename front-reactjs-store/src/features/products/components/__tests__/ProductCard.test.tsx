import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductCard from '../ProductCard';
import { Product } from '../../models/Product';

describe('ProductCard (simple)', () => {
  const product: Product = {
    id: 1,
    category: 'Electronics',
    title: 'Test Product',
    price: 100,
    description: 'This is a test product',
    urlImage: 'https://example.com/image.jpg',
    stock: 10,
  };

  const mockState = {
    payment: {
      acceptanceTokens: null,
      cardToken: null,
      transactionId: null
    },
    formPayment: {
      userInfo: null,
      cardInfo: null,
      step: null,
      error: null
    }
  };

  const store = configureStore({ 
    reducer: () => mockState
  });

  it('renderiza el título del producto', () => {
    render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('renderiza la categoría', () => {
    render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    );
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('renderiza el precio', () => {
    render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    );
    expect(screen.getByText('$100')).toBeInTheDocument();
  });
});
