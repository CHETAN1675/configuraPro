import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Card, Alert, InputGroup } from "react-bootstrap";
import { loginUser, signupUser } from "../features/auth/authSlice";
import { loadCart } from "../services/cartService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();
  const { loading, error, userEmail } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userEmail) {
      dispatch(loadCart(userEmail));
    }
  }, [userEmail, dispatch]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLocalError("");
    setShowPassword(false);
  };

  const toggleMode = () => {
    if (loading) return;
    setIsSignup((prev) => !prev);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Email and password are required");
      return;
    }

    if (isSignup && password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    isSignup
      ? dispatch(signupUser({ email, password }))
      : dispatch(loginUser({ email, password }));
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="shadow-sm" style={{ width: 420 }}>
        <Card.Body>
          <h3 className="text-center mb-4">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h3>

          {(localError || error) && (
            <Alert variant="danger">{localError || error}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Confirm Password */}
            {isSignup && (
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
            )}

            <Button type="submit" className="w-100" disabled={loading}>
              {loading
                ? "Please wait..."
                : isSignup
                ? "Create Account"
                : "Login"}
            </Button>
          </Form>

          {/* Toggle */}
          <div className="text-center mt-3">
            <Button
              variant="link"
              className="p-0"
              onClick={toggleMode}
              disabled={loading}
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don’t have an account? Sign up"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
