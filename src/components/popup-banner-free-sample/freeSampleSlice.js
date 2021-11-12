import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayVideo: false,
};

export const freeSampleSlice = createSlice({
  name: 'freeSample',
  initialState,
  reducers: {
    toggleVideoModalDisplay(state, action) {
      state.displayVideo = !state.displayVideo;
    },
  },
});

export const { toggleVideoModalDisplay } = freeSampleSlice.actions;

export const selectDisplayVideo = (state) => state.freeSample.displayVideo;

export default freeSampleSlice.reducer;