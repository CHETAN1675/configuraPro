import { useDispatch, useSelector } from "react-redux";
import { setProductType } from "../features/configurator/configuratorSlice";
import { Card, Button,Alert } from "react-bootstrap";
import { useState } from "react";

export default function ProductType() {
  const dispatch = useDispatch();
  const productType = useSelector(
    (state) => state.configurator.productType
  );

   const [showError, setShowError] = useState(false);

  const handleSelect = (type) => {
    dispatch(setProductType(type));
    setShowError(false);
  };

  const handleNext = () => {
    if (!productType) {
      setShowError(true);
      return;
    }

    
    console.log("Product type valid:", productType);
  };


  return (
    <Card className="p-4">
      <h4 className="mb-3">Select Product Type</h4>


      {showError && (
        <Alert variant="danger">
          Please select a product type to continue
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

     
      <Button variant="success" onClick={handleNext}>
        Next
      </Button>
    </Card>
  );
}
