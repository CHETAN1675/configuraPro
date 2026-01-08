import { useSelector, useDispatch } from "react-redux";
import { Card, ListGroup, Button } from "react-bootstrap";
import { removeFromCart, clearCart } from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalPrice = items.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  );

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
                <strong>{item.product?.name || "Product"}</strong> -{" "}
                {item.productType} | {item.dimensions.width}×
                {item.dimensions.height}×{item.dimensions.depth} |{" "}
                {item.capacity} | {item.material} |{" "}
                {item.addOns.join(", ")}
              </div>
              <div>
                <span className="me-3">
                  ${item.totalPrice || 0}
                </span>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => dispatch(removeFromCart(index))}
                >
                  Remove
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Card className="p-3">
        <h5>Total: ${totalPrice}</h5>
        <Button
          variant="secondary"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </Button>
      </Card>
    </div>
  );
}
