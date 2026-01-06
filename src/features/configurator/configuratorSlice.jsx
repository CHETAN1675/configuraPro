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
       // rule: large capacity cannot be plastic
      if (state.capacity === "Large" && state.material === "Plastic") {
        state.error =
          "Plastic material is not available for large capacity";
      } else {
        state.error = "";
      }
    },
    setMaterial(state, action) {
      state.material = action.payload;
        // same rule check from the other side
      if (state.capacity === "Large" && state.material === "Plastic") {
        state.error =
          "Plastic material is not available for large capacity";
      } else {
        state.error = "";
      }
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
