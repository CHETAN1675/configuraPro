import { Card, Alert, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectWarnings,selectPrimaryError} from "../rules/RuleSelectors";
import { selectTotalPrice } from "../pricing/pricingSelectors";

export default function ConfigSummary() {
  const totalPrice = useSelector(selectTotalPrice);
  const warnings = useSelector(selectWarnings);
  const error = useSelector(selectPrimaryError);

  return (
    <Card className="p-4 mt-4">
      <h4 className="mb-3">Configuration Summary</h4>

      {/* Errors (blocking) */}
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {/* Warnings (non-blocking) */}
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
