import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../../containers/box-builder-page/productsSlice'
import boxReducer from '../../containers/box-builder-page/boxSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    box: boxReducer,
  },
});
