import { Container, Card, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCapacity } from "../configuratorSlice";

export default function Capacity() {
  const dispatch = useDispatch();
  const capacity = useSelector(
    (state) => state.configurator.capacity
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
            <Form.Control
              type="number"
              placeholder="Enter capacity"
              value={capacity}
              onChange={(e) =>
                dispatch(setCapacity(e.target.value))
              }
            />
          </Form.Group>

          <Button type="submit" disabled={!capacity}>
            Save Capacity
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
