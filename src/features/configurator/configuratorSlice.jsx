import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,       
  material: "",        
  capacity: "",      
  dimension: "",       
  addOns: []           
};

const slice = createSlice({
  name: "configurator",
  initialState,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
      // reset other selections
      state.material = "";
      state.capacity = "";
      state.dimension = "";
      state.addOns = [];
    },
    setMaterial(state, action) {
      state.material = action.payload;
    },
    setCapacity(state, action) {
      state.capacity = action.payload;
      // if capacity changes, clear dimension
      state.dimension = "";
    },
    setDimension(state, action) {
      state.dimension = action.payload;
    },
    setAddOns(state, action) {
      state.addOns = action.payload;
    }
  }
});

export const {
  setProduct,
  setMaterial,
  setCapacity,
  setDimension,
  setAddOns
} = slice.actions;

export default slice.reducer;
