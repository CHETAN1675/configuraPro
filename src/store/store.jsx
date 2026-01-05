import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import ConfiguratorReducer from "../features/configurator/configuratorSlice";


export const store = configureStore({
  reducer: {
     auth: authReducer,
     Configurator:ConfiguratorReducer
  },
});
