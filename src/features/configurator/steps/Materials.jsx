import { Container, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";

export default function Material() {
  const [material, setMaterial] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Material:", material);
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <h4 className="mb-3">Select Material</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Material</Form.Label>

            <Form.Select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="">Select material</option>
              <option value="steel">Steel</option>
              <option value="aluminum">Aluminum</option>
              <option value="plastic">Plastic</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" disabled={!material}>
            Save Material
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
