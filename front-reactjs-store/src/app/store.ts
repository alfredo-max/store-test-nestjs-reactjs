import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/redux/slices/productsSlice';
import formPaymentReducer from '../features/payments/redux/slices/slices/formPaymentSlice';
import selectedProductPayment from '../features/products/redux/slices/selectedProductPaymentSlice'
import paymentReducer from '../features/payments/redux/slices/slices/paymentSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    formPayment: formPaymentReducer,
    selectedProductPayment: selectedProductPayment,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
