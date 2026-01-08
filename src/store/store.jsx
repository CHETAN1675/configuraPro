import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import ConfiguratorReducer from "../features/configurator/configuratorSlice";
import cartReducer from "../features/cart/cartSlice";


export const store = configureStore({
  reducer: {
     auth: authReducer,
     configurator:ConfiguratorReducer,
     cart : cartReducer,
  },
});
