import { useSelector, useDispatch } from "react-redux";
import { Card, ListGroup, Button } from "react-bootstrap";
import { clearCart } from "../features/cart/cartSlice";
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

  if (items.length === 0) {
    return <p className="mt-4">Your cart is empty</p>;
  }

  return (
    <div className="container mt-4">
      <h3>Shopping Cart</h3>

      <ListGroup className="mb-3">
        {items.map((item, index) => (
          <ListGroup.Item key={item.id || index}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.product?.name || "Product"}</strong> —{" "}
                {item.productType} | {item.dimensions.width}×
                {item.dimensions.height}×{item.dimensions.depth} |{" "}
                {item.capacity} | {item.material} |{" "}
                {item.addOns.join(", ")}
              </div>
              <div>
                <span className="me-3">${item.totalPrice || 0}</span>
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
        ))}
      </ListGroup>

      <Card className="p-3 mb-3">
        <h5>Total: ${totalPrice}</h5>
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
