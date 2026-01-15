import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {adminLogin,adminSignup} from "../features/adminAuth/adminAuthSlice";

export default function AdminAuthModal({ show, onHide }) {
  const dispatch = useDispatch();

  const { loading, error, token } = useSelector(
    (state) => state.adminAuth
  );

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  useEffect(() => {
    if (token && show) {
      onHide();
    }
  }, [token, show, onHide]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return;

    if (isSignup) {
      dispatch(adminSignup({ email, password }));
    } else {
      dispatch(adminLogin({ email, password }));
    }
  };

  const handleSwitchMode = () => {
    setIsSignup((prev) => !prev);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isSignup ? "Admin Signup" : "Admin Login"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
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

          <Button
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isSignup
              ? "Create Admin Account"
              : "Login"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <Button
            variant="link"
            onClick={handleSwitchMode}
            disabled={loading}
          >
            {isSignup
              ? "Already an admin? Login"
              : "New admin? Signup"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
