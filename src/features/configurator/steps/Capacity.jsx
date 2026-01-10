import { useDispatch, useSelector } from "react-redux";
import { Form, Alert, Container, Card, Button } from "react-bootstrap";
import { setCapacity } from "../configuratorSlice";
import { selectPrimaryError } from "../../rules/RuleSelectors";
import { useNavigate } from "react-router-dom";

export default function Capacity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capacity = useSelector(
    (state) => state.configurator.capacity
  );
  const error = useSelector(selectPrimaryError);

  const saveCapacity = () => {
    if (!capacity) return;
    dispatch(setCapacity(capacity));
  };

  const handleSave = () => {
    saveCapacity();
    navigate("/configurator");
  };

  const handleNext = () => {
    saveCapacity();
    navigate("/materials");
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <h4 className="mb-3">Select Capacity</h4>

        <Form>
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

          <div className="d-flex gap-2">
            <Button
              variant="secondary"
              onClick={handleSave}
              disabled={!capacity || !!error}
            >
              Save
            </Button>

            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!capacity || !!error}
            >
              Next
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
