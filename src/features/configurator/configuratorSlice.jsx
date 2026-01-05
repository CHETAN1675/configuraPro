import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productType: "",
};

const configuratorSlice = createSlice({
  name: "configurator",
  initialState,
  reducers: {
    setProductType(state, action) {
      state.productType = action.payload;
    },
    resetConfigurator() {
      return initialState;
    },
  },
});

export const { setProductType, resetConfigurator } =
  configuratorSlice.actions;

export default configuratorSlice.reducer;
