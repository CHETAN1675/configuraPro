import { useDispatch, useSelector } from "react-redux";
import { setProductType } from "../configuratorSlice";
import { Card, Button, Alert } from "react-bootstrap";
import { selectPrimaryError } from "../../rules/RuleSelectors";
import { useNavigate } from "react-router-dom";


export default function ProductType() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productType = useSelector(
    (state) => state.configurator.productType
  );
  const error = useSelector(selectPrimaryError);

  const handleSelect = (type) => {
    dispatch(setProductType(type));
  };

  const handleNext = () => {
    if (!productType) return;
    navigate("/dimensions");
  };

  return (
    <Card className="p-4">
      <h4 className="mb-3">Select Product Type</h4>

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      <div className="d-flex gap-3 mb-3">
        <Button
          variant={productType === "table" ? "primary" : "outline-primary"}
          onClick={() => handleSelect("table")}
        >
          Table
        </Button>

        <Button
          variant={productType === "conveyor" ? "primary" : "outline-primary"}
          onClick={() => handleSelect("conveyor")}
        >
          Conveyor
        </Button>
      </div>

      <Button variant="success" onClick={handleNext} disabled={!productType || !!error}>
        Next
      </Button>
    </Card>
  );
}
