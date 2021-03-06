import { createSlice } from '@reduxjs/toolkit';

// Structure for item in items : { products: [], name: "", unitPrice: 245, currency: "£", qty: 2 }
const initialState = {
  boxes: [],
  next_index: 0,
  quoteDetails: {},
};

const calculateTotalDiscount = (unitPrice, minCost, qty) => {
  const maxDiscount = unitPrice - minCost;
  let discountRate = 0;
  if (qty >= 1000) {
    discountRate = 1;
  } else if (qty > 500) {
    discountRate = 0.70;
  } else if (qty > 250) {
    discountRate = 0.50;
  } else if (qty > 100) {
    discountRate = 0.35;
  } else if (qty > 50) {
    discountRate = 0.20;
  } else if (qty > 25) {
    discountRate = 0.10;
  } else {
    discountRate = 0;
  }
  return discountRate * maxDiscount * qty;
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
    updateBoxInQuote(state, action) {
      const boxIndex = action.payload.boxIndex;
      const boxes = state.boxes;
      const initialBoxQty = boxes[boxIndex].qty;
      const unitPrice = action.payload.box.unitPrice;
      const minPrice = action.payload.box.minPrice;
      const prediscountedCost = Number(Number.parseFloat(unitPrice * initialBoxQty).toFixed(2));
      const discount = Number(Number.parseFloat(calculateTotalDiscount(unitPrice, minPrice, initialBoxQty)).toFixed(2));
      const discountedCost = Number(Number.parseFloat(prediscountedCost - discount).toFixed(2));
      boxes[boxIndex] = {
        ...action.payload.box,
        qty: initialBoxQty,
        prediscountedCost: prediscountedCost,
        discount: discount,
        discountedCost: discountedCost,
        id: boxIndex,
      };
    },
    removeBoxFromQuote: (state, action) => {
      state.boxes = state.boxes.filter((box) => {
        return box.id !== action.payload.id;
      });
    },
    changeNameOfBoxInQuote: (state, action) => {
      const box = state.boxes.find(e => e.name === action.payload.oldName);
      box.name = action.payload.newName;
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

export const { addBoxToQuote, updateBoxInQuote, changeNameOfBoxInQuote, removeBoxFromQuote, setQuantityOfBoxesInQuote, setQuoteDetails, deleteQuote } = quoteSlice.actions;

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