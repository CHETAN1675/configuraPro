import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null, 
  productType: "",
  dimensions: { width: "", height: "", depth: "" },
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


    loadConfiguration(state, action) {
      return { ...state, ...action.payload };
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
  loadConfiguration,
  resetConfigurator,
} = configuratorSlice.actions;

export default configuratorSlice.reducer;
