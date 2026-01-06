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
  error: "",
};

const configuratorSlice = createSlice({
  name: "configurator",
  initialState,
  reducers: {
    setProductType(state, action) {
      state.productType = action.payload;
      state.error = "";
    },

    setDimensions(state, action) {
      state.dimensions = action.payload;
      state.error = "";
    },

    setCapacity(state, action) {
      state.capacity = action.payload;
      const errors = validateConfiguration(state);
      state.error = errors[0] || "";
    },

    setMaterial(state, action) {
      state.material = action.payload;
      const errors = validateConfiguration(state);
      state.error = errors[0] || "";
    },

    setAddOns(state, action) {
      state.addOns = action.payload;
      const errors = validateConfiguration(state);
      state.error = errors[0] || "";
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
