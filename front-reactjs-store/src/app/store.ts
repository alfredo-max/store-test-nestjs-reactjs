import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/redux/slices/productsSlice';
import paymentReducer from '../features/transactions/redux/paymentSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
