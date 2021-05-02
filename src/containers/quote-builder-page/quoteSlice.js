import { createSlice } from '@reduxjs/toolkit';

// Structure for item in items : { products: [], name: "", unitPriceAferDiscount: 245, currency: "£", qty: 2 }
const initialState = {
  boxes: [],
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    addBoxToQuote(state, action) {
      state.boxes.push({...action.payload, qty: 1});
    },
    removeBoxFromQuote: (state, action) => {
      state.boxes = state.boxes.filter((box) => {
        return box.name !== action.payload.name;
      });
    },
    setQuantityOfBoxesInQuote: (state, action) => {
      state.boxes.find(e => e.name === action.payload.name).qty = action.payload.newQuantity;
    },
  },
});

export const { addBoxToQuote, removeBoxFromQuote, setQuantityOfBoxesInQuote } = quoteSlice.actions;

export const selectBoxesInQuote = (state) => state.quote.boxes;
export const selectQuoteTotalCost = (state) => {
  if (state.quote.boxes.length === 0) {
    return 0;
  } else {
    return state.quote.boxes.map((box) => box.qty * box.unitPriceAferDiscount).reduce((e,v) => e + v);
  }
};
const calculateTotalQtyOfBoxesInQuote = (boxes) => {
  return boxes.map(box => box.qty).reduce((e,v) => e + v);
};
export const selectNumberOfBoxesInQuote = (state) => {
  if (state.quote.boxes.length === 0) {
    return 0;
  }
  return calculateTotalQtyOfBoxesInQuote(state.quote.boxes);
};

export default quoteSlice.reducer;