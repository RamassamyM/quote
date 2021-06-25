import { createSlice } from '@reduxjs/toolkit';

// Structure for item in items : { products: [], name: "", unitPrice: 245, currency: "£", qty: 2 }
const initialState = {
  boxes: [],
  next_index: 0,
  quoteDetails: {},
};

const calculateTotalDiscount = (unitPrice, minCost, qty) => {
  let discount = 0;
  if (qty >= 10 && qty < 100) {
    discount = unitPrice * 0.05;
  }
  if (qty >= 100 && qty < 500) {
    discount = unitPrice * 0.1;
  }
  if (qty >= 500) {
    discount = unitPrice * 0.15;
  }
  discount = (unitPrice - discount) < minCost ? (unitPrice - minCost) : discount;
  return discount * qty;
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    addBoxToQuote(state, action) {
      state.boxes.push({
        ...action.payload,
        qty: 1,
        prediscountedCost: action.payload.unitPrice,
        discount: 0,
        discountedCost: action.payload.unitPrice,
        id: state.next_index});
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
      box.discount = Number(Number.parseFloat(calculateTotalDiscount(box.unitPrice, box.minPrice, action.payload.qty)).toFixed(2));
      box.prediscountedCost = Number(Number.parseFloat(box.unitPrice * action.payload.qty).toFixed(2));
      box.discountedCost = Number(Number.parseFloat(box.prediscountedCost - box.discount).toFixed(2));
    },
    setQuoteDetails: (state, action) => {
      state.quoteDetails = action.payload.quoteDetails;
    },
    deleteQuote: (state, action) => {
      state = initialState;
      return state;
    },
  },
});

export const { addBoxToQuote, removeBoxFromQuote, setQuantityOfBoxesInQuote, setQuoteDetails, deleteQuote } = quoteSlice.actions;

export const selectBoxesInQuote = (state) => state.quote.boxes;
export const selectQuote = (state) => state.quote;
export const selectNumberOfBoxTypesInQuote = (state) => state.quote.boxes.length;
export const selectQuoteDiscountedCost = (state) => {
  if (state.quote.boxes.length === 0) {
    return 0;
  } else {
    return state.quote.boxes.map((box) => box.discountedCost).reduce((e,v) => e + v);
  }
};
export const selectQuotePrediscountedCost = (state) => {
  if (state.quote.boxes.length === 0) {
    return 0;
  } else {
    return state.quote.boxes.map((box) => box.prediscountedCost).reduce((e,v) => e + v);
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