import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productType: "",
   dimensions: {
    width: "",
    height: "",
    depth: "",
  },
};

const configuratorSlice = createSlice({
  name: "configurator",
  initialState,
  reducers: {
    setProductType(state, action) {
      state.productType = action.payload;
    },
     setDimensions(state, action) {
      state.dimensions = action.payload;
     },
    resetConfigurator() {
      return initialState;
    },
  },
});

export const { setProductType,setDimensions, resetConfigurator } = configuratorSlice.actions;

export default configuratorSlice.reducer;
