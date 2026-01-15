import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useState } from "react";

export default function AdminAuthModal({ show, onHide }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    
    console.log("Admin Auth:", { email, password, isSignup });

    onHide();
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

          <Button type="submit" className="w-100">
            {isSignup ? "Create Admin Account" : "Login"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <Button
            variant="link"
            onClick={() => setIsSignup((prev) => !prev)}
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
