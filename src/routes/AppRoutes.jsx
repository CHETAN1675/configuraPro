import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Login() {
  return <h2>Login Page</h2>;
}

function Dashboard() {
  return <h2>Dashboard</h2>;
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}
