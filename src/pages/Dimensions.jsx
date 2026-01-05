import { Card, Form, Button } from "react-bootstrap";

export default function Dimensions() {
  return (
    <Card className="p-4">
      <h4 className="mb-3">Enter Dimensions</h4>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Length</Form.Label>
          <Form.Control type="number" placeholder="Enter length" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Width</Form.Label>
          <Form.Control type="number" placeholder="Enter width" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Height</Form.Label>
          <Form.Control type="number" placeholder="Enter height" />
        </Form.Group>

        <Button variant="secondary">Back</Button>{" "}
        <Button variant="success">Next</Button>
      </Form>
    </Card>
  );
}
