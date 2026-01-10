import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Configurator from "../pages/Configurator";
import ProtectedRoute from "./ProtectedRoute";
import ProductType from "../features/configurator/steps/ProductType";
import Dimensions from "../features/configurator/steps/Dimensions";
import Capacity from "../features/configurator/steps/Capacity";
import Material from "../features/configurator/steps/Materials";
import AddOns from "../features/configurator/steps/AddOns";
import ProductList from "../pages/ProductList";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import OrderHistory from "../pages/OrderHistory";

export default function AppRoutes() {
  return (
    
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

           <Route
           path="/addons"
           element={
            <AddOns />
            }
           />
           <Route
           path="/products/:productId"
           element={<ProductDetails />}
           />
          <Route path="/products" 
          element={<ProductList />}
           />
           <Route path="/cart" 
           element={<Cart />} 
           />        
          <Route path="/checkout"
          element={<Checkout />}
           />
           <Route path="/order-success"
            element={<OrderSuccess />}
           />
           <Route path="/orders"
           element={<OrderHistory/>}
           />

        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    
  );
}
