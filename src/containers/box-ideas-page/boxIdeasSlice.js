import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBoxIdeas } from '../../core/services/firestore-requests';

const initialState = {
  list: [],
  status: 'idle'
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchBoxIdeasAsync = createAsyncThunk(
  'boxIdeas/fetchBoxIdeas',
  async () => {
    const boxIdeas = await fetchBoxIdeas();
    return boxIdeas.map((boxIdea) => {
      return {...boxIdea, display: true }
    });
  }
);

export const boxIdeasSlice = createSlice({
  name: 'boxIdeas',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    filterBoxIdeas: (state, action) => {
      const tag = action.payload;
      state.list = state.list.map((boxIdea) => {
        const display = tag === boxIdea.category || tag === "All"
        return { ...boxIdea, display: display}
      });
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoxIdeasAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBoxIdeasAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload;
      })
  },
});

export const { filterBoxIdeas } = boxIdeasSlice.actions;
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBoxIdeas = (state) => state.boxIdeas.list;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default boxIdeasSlice.reducer;
