import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../../containers/box-builder-page/productsSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer
  },
});
