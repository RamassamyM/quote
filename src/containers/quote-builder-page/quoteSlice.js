import { createSlice } from '@reduxjs/toolkit';

// Structure for item in items : { products: [], name: "", unitPrice: 245, currency: "£", qty: 2 }
const initialState = {
  boxes: [],
  next_index: 0,
  customerDetails: {},
};

const calculateDiscount = (unitPrice, qty) => {
  if (qty >= 10 && qty < 100) {
    return unitPrice * qty * 0.05;
  }
  if (qty >= 100 && qty < 500) {
    return unitPrice * qty * 0.1;
  }
  if (qty >= 500) {
    return unitPrice * qty * 0.15;
  }
  return 0;
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    addBoxToQuote(state, action) {
      state.boxes.push({...action.payload, qty: 1, discount: 0, id: state.next_index});
      state.next_index = state.next_index + 1;
    },
    removeBoxFromQuote: (state, action) => {
      state.boxes = state.boxes.filter((box) => {
        return box.id !== action.payload.id;
      });
    },
    setQuantityOfBoxesInQuote: (state, action) => {
      const box = state.boxes.find(e => e.name === action.payload.name);
      box.qty = action.payload.qty;
      box.discount = calculateDiscount(box.unitPrice, action.payload.qty);
    },
    setQuoteDetails: (state, action) => {
      state.customerDetails = action.payload.customerDetails;
    },
    deleteQuote: (state, action) => {
      state = initialState;
      return state;
    },
  },
});

export const { addBoxToQuote, removeBoxFromQuote, setQuantityOfBoxesInQuote, setQuoteDetails, deleteQuote } = quoteSlice.actions;

export const selectBoxesInQuote = (state) => state.quote.boxes;
export const selectQuoteInfos = (state) => state.quote;
export const selectNumberOfBoxTypesInQuote = (state) => state.quote.boxes.length;
export const selectQuoteTotalCost = (state) => {
  if (state.quote.boxes.length === 0) {
    return 0;
  } else {
    return state.quote.boxes.map((box) => box.qty * box.unitPrice).reduce((e,v) => e + v);
  }
};
export const selectQuoteTotalDiscount = (state) => {
  if (state.quote.boxes.length === 0) {
    return 0;
  } else {
    return state.quote.boxes.map((box) => box.discount).reduce((e,v) => e + v);
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