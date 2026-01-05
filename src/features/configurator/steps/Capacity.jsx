import { Container, Form, Button, Card } from "react-bootstrap";
import { useState } from "react";

export default function Capacity() {
  const [capacity, setCapacity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Capacity:", capacity);
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <h4 className="mb-3">Select Capacity</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </Form.Group>

          <Button type="submit">Save Capacity</Button>
        </Form>
      </Card>
    </Container>
  );
}
