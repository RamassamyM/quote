import { createSlice } from '@reduxjs/toolkit';

// Structure for item in items : { product: {}, displayedVariantSelected: {}, qty: 2 }
const initialState = {
  items: [],
};
export const boxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    addProductToBox(state, action) {
      if (state.items.find(e => e.variantSelected.id === action.payload.variantSelected.id)) {
        state.items.find(e => e.variantSelected.id === action.payload.variantSelected.id).qty += 1;
      } else {
        state.items.push({product: action.payload.product, variantSelected: action.payload.variantSelected, qty: 1});
      }
    },
    removeProductFromBox: (state, action) => {
      state.items = state.items.filter((item) => {
        return item.variantSelected.id !== action.payload.variantSelected.id;
      });
    },
    resetBox: (state) => {
      state.items = [];
    },
    addOneQuantityOfProductInBox: (state, action) => {
      state.items.find(e => e.variantSelected.id === action.payload.variantSelected.id).qty += 1;
    },
    removeOneQuantityOfProductInBox: (state, action) => {
      state.items.find(e => e.variantSelected.id === action.payload.variantSelected.id).qty -= (state.items.find(e => e.variantSelected.id === action.payload.variantSelected.id).qty  > 0 ? 1 : 0);
    },
    setQuantityOfProductInBox: (state, action) => {
      state.items.find(e => e.variantSelected.id === action.payload.variantSelected.id).qty = action.payload.qty;
    },
  },
});
export const { resetBox, addProductToBox, removeProductFromBox, addOneQuantityOfProductInBox, removeOneQuantityOfProductInBox, setQuantityOfProductInBox } = boxSlice.actions;
export const selectBoxItems = (state) => state.box.items;
export const selectBoxTotalCost = (state) => {
  if (state.box.items.length === 0) {
    return 0;
  } else {
    return state.box.items.map((item) => item.qty * item.variantSelected.price).reduce((e,v) => e + v);
  }
};
const calculateTotalQtyOfItems = (items) => {
  return items.map(item => item.qty).reduce((e,v) => e + v);
};
export const selectBoxNumberOfItems = (state) => {
  if (state.box.items.length === 0) {
    return 0;
  }
  return calculateTotalQtyOfItems(state.box.items);
};

export default boxSlice.reducer;