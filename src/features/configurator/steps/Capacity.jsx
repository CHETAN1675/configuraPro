import { useDispatch, useSelector } from "react-redux";
import { Form, Alert, Container, Card, Button } from "react-bootstrap";
import { setCapacity } from "../configuratorSlice";

export default function Capacity() {
  const dispatch = useDispatch();

  const capacity = useSelector(
    (state) => state.configurator.capacity
  );
  const error = useSelector(
    (state) => state.configurator.error
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved capacity:", capacity);
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <h4 className="mb-3">Select Capacity</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Capacity</Form.Label>

            <Form.Select
              value={capacity}
              onChange={(e) =>
                dispatch(setCapacity(e.target.value))
              }
            >
              <option value="">Select capacity</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </Form.Select>
          </Form.Group>

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Button type="submit" disabled={!capacity || error}>
            Save Capacity
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
