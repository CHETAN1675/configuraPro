import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item, index) => index !== action.payload
      );
    },
    clearCart() {
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
