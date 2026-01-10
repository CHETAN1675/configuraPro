import { useDispatch, useSelector } from "react-redux";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { setAddOns } from "../configuratorSlice";
import { useState, useEffect } from "react";
import {selectPrimaryError,selectDisabledAddOns} from "../../rules/RuleSelectors";
import { useNavigate } from "react-router-dom";

export default function AddOns() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedAddOns = useSelector((state) => state.configurator.addOns);
  const error = useSelector(selectPrimaryError);
  const disabledAddOns = useSelector(selectDisabledAddOns);

  const [localAddOns, setLocalAddOns] = useState(selectedAddOns);

  const addOnsOptions = [
    "Warranty",
    "Assembly Service",
    "Delivery Protection",
  ];

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
    navigate("/configurator")
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
              disabled={disabledAddOns[addOn]}
            />
          ))}

          <Button type="submit" disabled={!!error}>
            Save Add-Ons
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
