import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.userEmail);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <div className="p-4">
      <h3>Welcome, {email}</h3>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

