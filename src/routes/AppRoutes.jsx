import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Configurator from "../pages/Configurator";
import ProtectedRoute from "./ProtectedRoute";
import ProductType from "../pages/ProductType";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          <Route
          path="/product-type"
          element={
            <ProtectedRoute>
              <ProductType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configurator"
          element={
            <ProtectedRoute>
              <Configurator />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
