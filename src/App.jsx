import AppLayout from "./components/layout/Layout";
import AppRoutes from "./routes/AppRoutes";
import AdminRoutes from "./admin/routes/AdminRoutes"; 
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCart } from "./services/cartService";
import { Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedAuth = JSON.parse(
      localStorage.getItem("authData")
    );

    if (savedAuth?.email) {
      dispatch(loadCart(savedAuth.email));
    }
  }, [dispatch]);

  return (
    <AppLayout>
      <Routes>
        {/* Admin routes mounted at /admin/* */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* User routes mounted normally */}
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
