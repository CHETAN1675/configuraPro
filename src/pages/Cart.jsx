import { useSelector, useDispatch } from "react-redux";
import { Card, ListGroup, Button ,Image} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { saveCart } from "../services/cartService";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const totalPrice = items.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  );

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    dispatch(saveCart(userEmail, updatedItems));
  };

  const handleClearCart = () => {
    dispatch(saveCart(userEmail, []));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (!items.length) {
    return <p className="mt-4">Your cart is empty</p>;
  }

  return (
    <div className="container mt-4">
      <h3>Shopping Cart</h3>

      <ListGroup className="mb-3">
        {items.map((item, index) => {
          const {
            product,
            productType,
            dimensions = {},
            capacity,
            material,
            addOns = [],
            totalPrice,
          } = item;

          const dimensionText =
            dimensions.width && dimensions.height && dimensions.depth
              ? `${dimensions.width} × ${dimensions.height} × ${dimensions.depth}`
              : "-";

          return (
            <ListGroup.Item key={item.id || index}>
              <div className="d-flex gap-3 align-items-start">
                 {item.product?.image && (
            <Image
             src={item.product.image}
             rounded
             style={{
              width: 80,
              height: 80,
              objectFit: "contain",
              flexShrink: 0,
              }}
            />
                 )}
                <div className="flex-grow-1">
                  <strong>{product?.name || "Product"}</strong>
                  <div className="text-muted small">
                    Type: {productType || "-"} <br />
                    Capacity: {capacity || "-"} <br />
                    Material: {material || "-"} <br />
                    Dimensions: {dimensionText} <br />
                    Add-ons: {addOns.length ? addOns.join(", ") : "-"}
                  </div>
                </div>

                <div className="text-end">
                  <div className="fw-bold mb-2">₹{totalPrice || 0}</div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      <Card className="p-3 mb-3">
        <h5>Total: ₹{totalPrice}</h5>
        <div className="d-flex gap-2 mt-2">
          <Button variant="secondary" onClick={handleClearCart}>
            Clear Cart
          </Button>
          <Button variant="primary" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      </Card>
    </div>
  );
}
