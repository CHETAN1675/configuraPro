import { createSlice } from "@reduxjs/toolkit";
import { validateConfiguration } from "../rules/RulesEngine";

const initialState = {
  productType: "",
  dimensions: {
    width: "",
    height: "",
    depth: "",
  },
  capacity: "",
  material: "",
  addOns: [],
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

    setAddOns(state, action) {
      state.addOns = action.payload;
    },

    resetConfigurator() {
      return initialState;
    },
  },
});

export const {
  setProductType,
  setDimensions,
  setCapacity,
  setMaterial,
  setAddOns,
  resetConfigurator,
} = configuratorSlice.actions;

export default configuratorSlice.reducer;
