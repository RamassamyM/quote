import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: ["Body", "Food & Drink", "Books & Journals", "Room", "Other"],
  selected: "All"
};
export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    chooseCategoryFilter: (state, action) => {
      state.selected = action.payload;
    },
  },
});
export const { chooseCategoryFilter } = categoriesSlice.actions;
export const selectCategories = (state) => state.categories;
export default categoriesSlice.reducer;
