import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";


// Lazy-loaded pages 
const Auth = lazy(() => import("../pages/Auth"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Configurator = lazy(() => import("../pages/Configurator"));
const ProductList = lazy(() => import("../pages/ProductList"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const OrderSuccess = lazy(() => import("../pages/OrderSuccess"));
const OrderHistory = lazy(() => import("../pages/OrderHistory"));
const ConfigSummary = lazy(()=>import("../features/configurator/ConfigSummary"))

// Lazy-loaded configurator steps 

const Dimensions = lazy(() =>
  import("../features/configurator/steps/Dimensions")
);
const Capacity = lazy(() =>
  import("../features/configurator/steps/Capacity")
);
const Material = lazy(() =>
  import("../features/configurator/steps/Materials")
);
const AddOns = lazy(() =>
  import("../features/configurator/steps/AddOns")
);



export default function AppRoutes() {

  const authToken = useSelector((state)=> state.auth.authToken);
  
  return (
    <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
      <Routes>
        {/* Public */}
        <Route path="/auth" 
        element={
          authToken ? <Navigate to="/products" replace/> : <Auth />
          } 
          />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:productId"
          element={
            <ProtectedRoute>
              <ProductDetails />
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

        {/* Configurator steps */}
      
        <Route
          path="/dimensions"
          element={
            <ProtectedRoute>
              <Dimensions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/capacity"
          element={
            <ProtectedRoute>
              <Capacity />
            </ProtectedRoute>
          }
        />

        <Route
          path="/materials"
          element={
            <ProtectedRoute>
              <Material />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addons"
          element={
            <ProtectedRoute>
              <AddOns />
            </ProtectedRoute>
          }
        />

        {/* Cart & orders */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

       <Route
          path="/config-summary"
          element={
            <ProtectedRoute>
              <ConfigSummary/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Suspense>
  );
}
