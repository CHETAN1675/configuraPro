import { Card, Alert, ListGroup, Button } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {selectPrimaryError} from "../rules/RuleSelectors";
import { selectTotalPrice } from "../pricing/pricingSelectors";
import { addToCart } from "../cart/cartSlice";
import { resetConfigurator } from "../configurator/configuratorSlice";


export default function ConfigSummary() {
  const config = useSelector((state) => state.configurator);
  const product = useSelector((state) => state.configurator.product);

  const totalPrice = useSelector(selectTotalPrice);
  const error = useSelector(selectPrimaryError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const warnings = [];
  if (config.capacity === "Medium" && config.material === "Plastic") {
  warnings.push("Plastic with Medium capacity may reduce durability");
  }

    const handleAddToCart = () => {
    if (!product) {
      alert("Select a product first");
      return;
    }

    dispatch(addToCart({ ...config, id: Date.now() }));
    dispatch(resetConfigurator());
    navigate("/cart")
  };


  return (
    <Card className="p-4 mt-4">
      <h4 className="mb-3">Configuration Summary</h4>

      {/* Selected product */}
      {product && (
        <p className="mb-3">
          <strong>Product:</strong> {product.name}
        </p>
      )}

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

      {/* Blocking error */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Non-blocking warnings */}
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

      <h5 className="mt-3">
        Total Price: <strong>${totalPrice}</strong>
      </h5>
        <Button
        variant="success"
        className="mt-3"
        onClick={handleAddToCart}
        disabled={!!error} 
      >
        Add to Cart
      </Button>
    </Card>
  );
}
