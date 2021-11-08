import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../../containers/box-builder-page/productsSlice';
import categoriesReducer from '../../containers/box-builder-page/categoriesSlice';
import boxIdeaCategoriesReducer from '../../containers/box-ideas-page/categoriesSlice';
import boxIdeasReducer from '../../containers/box-ideas-page/boxIdeasSlice';
import boxReducer from '../../containers/box-builder-page/boxSlice';
import quoteReducer from '../../containers/quote-builder-page/quoteSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    box: boxReducer,
    quote: quoteReducer,
    categories: categoriesReducer,
    boxIdeaCategories: boxIdeaCategoriesReducer,
    boxIdeas: boxIdeasReducer
  },
});
