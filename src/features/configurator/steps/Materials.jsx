import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setMaterial } from "../configuratorSlice";
import { selectPrimaryError } from "../../rules/RuleSelectors";

export default function Material() {
  const dispatch = useDispatch();

  const material = useSelector((state) => state.configurator.material);
  const error = useSelector(selectPrimaryError);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setMaterial(material));
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
              onChange={(e) => dispatch(setMaterial(e.target.value))}
            >
              <option value="">Select material</option>
              <option value="Steel">Steel</option>
              <option value="Aluminum">Aluminum</option>
              <option value="Plastic">Plastic</option>
            </Form.Select>
          </Form.Group>

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Button type="submit" disabled={!material || !!error}>
            Save Material
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
