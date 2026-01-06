import { useDispatch, useSelector } from "react-redux";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { setAddOns } from "../configuratorSlice";
import { useState,useEffect } from "react";

export default function AddOns() {
  const dispatch = useDispatch();
  const selectedAddOns = useSelector((state) => state.configurator.addOns);
  const error = useSelector((state) => state.configurator.error);
  const capacity = useSelector((state) => state.configurator.capacity);
  const material = useSelector((state) => state.configurator.material);

  const [localAddOns, setLocalAddOns] = useState(selectedAddOns);

  const addOnsOptions = ["Warranty", "Assembly Service", "Delivery Protection"];

   useEffect(() => {
    setLocalAddOns(selectedAddOns);
  }, [selectedAddOns]);

  const toggleAddOn = (addOn) => {
    if (localAddOns.includes(addOn)) {
      setLocalAddOns(localAddOns.filter((item) => item !== addOn));
    } else {
      setLocalAddOns([...localAddOns, addOn]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setAddOns(localAddOns));
    console.log("Saved AddOns:", localAddOns);
  };

 return (
    <Container className="mt-4">
      <Card className="p-4">
        <h4 className="mb-3">Select Add-Ons</h4>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          {addOnsOptions.map((addOn) => (
            <Form.Check
              key={addOn}
              type="checkbox"
              label={addOn}
              checked={localAddOns.includes(addOn)}
              onChange={() => toggleAddOn(addOn)}
              className="mb-2"
              disabled={
                // disable invalid options based on current capacity/material
                (addOn === "Assembly Service" && capacity === "Small") ||
                (addOn === "Warranty" && material === "Plastic")
              }
            />
          ))}

          <Button type="submit" disabled={localAddOns.length === 0 || !!error}>
            Save Add-Ons
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
