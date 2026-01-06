import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Configurator from "../pages/Configurator";
import ProtectedRoute from "./ProtectedRoute";
import ProductType from "../features/configurator/steps/ProductType";
import Dimensions from "../features/configurator/steps/Dimensions";
import Capacity from "../features/configurator/steps/Capacity";
import Material from "../features/configurator/steps/Materials";

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
        <Route
          path="/capacity"
            element={
           <Capacity />
          }
          />

          <Route
           path="/materials"
           element={
            <Material/>
           }/>

        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
