import { Card, Alert, ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectWarnings,
  selectPrimaryError,
} from "../rules/RuleSelectors";
import { selectTotalPrice } from "../pricing/pricingSelectors";

export default function ConfigSummary() {
  const config = useSelector((state) => state.configurator);
  const totalPrice = useSelector(selectTotalPrice);
  const warnings = useSelector(selectWarnings);
  const error = useSelector(selectPrimaryError);

  return (
    <Card className="p-4 mt-4">
      <h4 className="mb-3">Configuration Summary</h4>

      <ListGroup className="mb-3">
        <ListGroup.Item>
          <strong>Product Type:</strong>{" "}
          {config.productType || "-"}
          <Link to="/product-type" className="ms-2">
            <Button size="sm" variant="link">Edit</Button>
          </Link>
        </ListGroup.Item>

        <ListGroup.Item>
          <strong>Dimensions:</strong>{" "}
          {config.dimensions.width
            ? `${config.dimensions.width} × ${config.dimensions.height} × ${config.dimensions.depth}`
            : "-"}
          <Link to="/dimensions" className="ms-2">
            <Button size="sm" variant="link">Edit</Button>
          </Link>
        </ListGroup.Item>

        <ListGroup.Item>
          <strong>Capacity:</strong>{" "}
          {config.capacity || "-"}
          <Link to="/capacity" className="ms-2">
            <Button size="sm" variant="link">Edit</Button>
          </Link>
        </ListGroup.Item>

        <ListGroup.Item>
          <strong>Material:</strong>{" "}
          {config.material || "-"}
          <Link to="/materials" className="ms-2">
            <Button size="sm" variant="link">Edit</Button>
          </Link>
        </ListGroup.Item>

        <ListGroup.Item>
          <strong>Add-Ons:</strong>{" "}
          {config.addOns.length > 0
            ? config.addOns.join(", ")
            : "-"}
          <Link to="/addons" className="ms-2">
            <Button size="sm" variant="link">Edit</Button>
          </Link>
        </ListGroup.Item>
      </ListGroup>

    
      {error && <Alert variant="danger">{error}</Alert>}

     
      {warnings.length > 0 && (
        <Alert variant="warning">
          <ListGroup variant="flush">
            {warnings.map((warning, index) => (
              <ListGroup.Item key={index}>
                {warning}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Alert>
      )}

      {/* Live price */}
      <h5 className="mt-3">
        Total Price: <strong>${totalPrice}</strong>
      </h5>
    </Card>
  );
}
