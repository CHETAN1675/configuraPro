import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload || [];
      state.totalQuantity = state.items.length;
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
