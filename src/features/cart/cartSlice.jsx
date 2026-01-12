import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload),
      state.totalQuantity = state.items.length;
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item, index) => index !== action.payload
      );
      state.totalQuantity = state.items.length;
    },
    clearCart() {
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
