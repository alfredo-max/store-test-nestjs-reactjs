import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts } from '../../products/services/productService';
import { Product } from '../../products/models/Product';

export const fetchProducts = createAsyncThunk<Product[]>(
'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllProducts();
    } catch (err: any) {
      console.error('Error fetching products:', err);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
