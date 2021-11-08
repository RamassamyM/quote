import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: ["Seasonal", "Occasions", "Unisex", "Themed"],
  selected: "All"
};
export const boxIdeaCategoriesSlice = createSlice({
  name: 'boxIdeaCategories',
  initialState,
  reducers: {
    chooseBoxIdeaCategoryFilter: (state, action) => {
      state.selected = action.payload;
    },
  },
});
export const { chooseBoxIdeaCategoryFilter } = boxIdeaCategoriesSlice.actions;
export const selectBoxIdeasCategories = (state) => state.boxIdeaCategories;
export default boxIdeaCategoriesSlice.reducer;
