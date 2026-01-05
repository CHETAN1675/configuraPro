import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Configurator from "../pages/Configurator";
import ProtectedRoute from "./ProtectedRoute";
import ProductType from "../pages/ProductType";
import Dimensions from "../pages/Dimensions";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />

        <Route
          path="/dashboard"
          element={
            
              <Dashboard />
           
          }
        />

        <Route
          path="/configurator"
          element={
          
              <Configurator />
            
          }
        />

        <Route
          path="/product-type"
          element={
           
              <ProductType />
            
          }
        />

        <Route
          path="/dimensions"
          element={
           
              <Dimensions />
            
          }
        />

        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
