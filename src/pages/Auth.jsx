import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { loginUser, signupUser } from "../features/auth/authSlice";
import { loadCart } from "../services/cartService";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();

  const { loading, error, userEmail } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (userEmail) {
      dispatch(loadCart(userEmail));
    }
  }, [userEmail, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Email and password are required");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (isSignup) {
      dispatch(signupUser({ email, password }));
    } else {
      dispatch(loginUser({ email, password }));
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <h3 className="text-center mb-4">
            {isSignup ? "Signup" : "Login"}
          </h3>

          {(localError || error) && (
            <Alert variant="danger">
              {localError || error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {isSignup && (
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />
              </Form.Group>
            )}

            <Button type="submit" className="w-100" disabled={loading}>
              {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
