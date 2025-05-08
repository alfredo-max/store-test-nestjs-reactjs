import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/Product';

interface SelectedProductPaymentState {
  selectedProduct: Product | null;
}

const initialState: SelectedProductPaymentState = {
  selectedProduct: null,
};

const selectedProductPaymentSlice = createSlice({
  name: 'selectedProductPayment',
  initialState,
  reducers: {
    setSelectedProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
    },
    resetSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
});

export const { setSelectedProduct, resetSelectedProduct } = selectedProductPaymentSlice.actions;
export default selectedProductPaymentSlice.reducer;