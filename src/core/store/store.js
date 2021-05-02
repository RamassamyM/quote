import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../../containers/box-builder-page/productsSlice';
import boxReducer from '../../containers/box-builder-page/boxSlice';
import quoteReducer from '../../containers/quote-builder-page/quoteSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    box: boxReducer,
    quote: quoteReducer,
  },
});
