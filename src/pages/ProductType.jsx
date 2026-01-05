import { useDispatch, useSelector } from "react-redux";
import { setProductType } from "../features/configurator/configuratorSlice";
import { Card, Button } from "react-bootstrap";

export default function ProductType() {
  const dispatch = useDispatch();
  const productType = useSelector(
    (state) => state.configurator.productType
  );

  const handleSelect = (type) => {
    dispatch(setProductType(type));
  };

  return (
    <Card className="p-4">
      <h4 className="mb-3">Select Product Type</h4>

      <div className="d-flex gap-3">
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

      {productType && (
        <p className="mt-3 text-muted">
          Selected: <strong>{productType}</strong>
        </p>
      )}
    </Card>
  );
}
