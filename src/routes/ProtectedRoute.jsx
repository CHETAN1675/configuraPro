import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const authToken = useSelector((state) => state.auth.authToken);

  if (!authToken) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
