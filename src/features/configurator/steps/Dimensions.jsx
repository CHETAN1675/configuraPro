import { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setDimensions } from "../configuratorSlice";
import { selectPrimaryError } from "../../rules/RuleSelectors";
import { useNavigate } from "react-router-dom";

export default function Dimensions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dimensions = useSelector((state) => state.configurator.dimensions);
  const error = useSelector(selectPrimaryError);

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");

  useEffect(() => {
    setWidth(dimensions.width || "");
    setHeight(dimensions.height || "");
    setDepth(dimensions.depth || "");
  }, [dimensions]);

  const saveDimensions = () => {
    dispatch(
      setDimensions({
        width: Number(width),
        height: Number(height),
        depth: Number(depth),
      })
    );
  };

  const handleSave = () => {
    saveDimensions();
    navigate("/configurator");
  };

  const handleNext = () => {
    saveDimensions();
    navigate("/capacity");
  };

  return (
    <Form>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Width</Form.Label>
        <Form.Control
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Height</Form.Label>
        <Form.Control
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Depth</Form.Label>
        <Form.Control
          type="number"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
        />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button
          variant="secondary"
          onClick={handleSave}
          disabled={!!error}
        >
          Save
        </Button>

        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!!error}
        >
          Next
        </Button>
      </div>
    </Form>
  );
}
