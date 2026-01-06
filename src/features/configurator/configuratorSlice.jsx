import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productType: "",
   dimensions: {
    width: "",
    height: "",
    depth: "",
  },
   capacity: "",
  material: "",
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
      setCapacity(state, action) {
      state.capacity = action.payload;
    },
    setMaterial(state, action) {
      state.material = action.payload;
    },
    resetConfigurator() {
      return initialState;
    },
  },
});

export const { setProductType,
               setDimensions,
               setCapacity,
               setMaterial,
               resetConfigurator
               } = configuratorSlice.actions;

export default configuratorSlice.reducer;
