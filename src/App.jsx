import AppLayout from "./components/layout/Layout";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCart } from "./services/cartService";

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
      <AppRoutes />
    </AppLayout>
  );
}

export default App;
