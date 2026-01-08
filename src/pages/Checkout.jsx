import { useSelector, useDispatch } from "react-redux";
import { Card, ListGroup, Button } from "react-bootstrap";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);

  const totalPrice = items.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  );

  if (items.length === 0) {
    return <p className="mt-4">Your cart is empty</p>;
  }

  const handlePlaceOrder = () => {
    // Here we will call Firebase to save the order
    
    dispatch(clearCart());
    navigate("/order-success");
  };

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>
      <ListGroup className="mb-3">
        {items.map((item, index) => (
          <ListGroup.Item key={item.id || index}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.product?.name || "Product"}</strong> -{" "}
                {item.productType} | {item.dimensions.width}×
                {item.dimensions.height}×{item.dimensions.depth} |{" "}
                {item.capacity} | {item.material} |{" "}
                {item.addOns.join(", ")}
              </div>
              <div>${item.totalPrice || 0}</div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Card className="p-3">
        <h5>Total: ${totalPrice}</h5>
        <Button variant="success" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Card>
    </div>
  );
}
