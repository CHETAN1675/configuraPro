import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setDimensions } from "../configuratorSlice";

export default function Dimensions() {
  const dispatch = useDispatch();
  const dimensions = useSelector(
    (state) => state.configurator.dimensions
  );

  const [width, setWidth] = useState(dimensions.width || "");
  const [height, setHeight] = useState(dimensions.height || "");
  const [depth, setDepth] = useState(dimensions.depth || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!width || !height || !depth) {
      setError("All dimensions are required");
      return;
    }

    if (width <= 0 || height <= 0 || depth <= 0) {
      setError("Dimensions must be greater than zero");
      return;
    }

    setError("");

    dispatch(
      setDimensions({
        width: Number(width),
        height: Number(height),
        depth: Number(depth),
      })
    );

   
  };

  return (
    <Form onSubmit={handleSubmit}>
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

      <Button type="submit">Save Dimensions</Button>
    </Form>
  );
}
