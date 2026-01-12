import { useSelector, useDispatch } from "react-redux";
import { Card, ListGroup, Button, Form } from "react-bootstrap";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { saveOrder } from "../services/orderService";
import { useState } from "react";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const totalPrice = items.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  );

  const handlePlaceOrder = async () => {
    if (!userEmail) {
      alert("Please login to place an order");
      return;
    }

    try {
      await saveOrder(userEmail, {
        items,
        totalPrice,
        paymentMethod: {
          type: paymentMethod,
          status: "PENDING",
        },
        status: "CREATED",
      });

      dispatch(clearCart());
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      alert("Order failed. Please try again.");
    }
  };

  if (items.length === 0) {
    return <p className="mt-4">Your cart is empty</p>;
  }

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>

      <ListGroup className="mb-3">
        {items.map((item, index) => (
          <ListGroup.Item key={item.id || index}>
            <div className="d-flex justify-content-between">
              <div>
                <strong>{item.product?.name}</strong> |{" "}
                {item.productType} | {item.capacity} | {item.material}
              </div>
              <div>${item.totalPrice}</div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Card className="p-3 mb-3">
        <Form>
          <Form.Label>Payment Method</Form.Label>
          <Form.Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="CARD">Card</option>
            <option value="UPI">UPI</option>
          </Form.Select>
        </Form>
      </Card>

      <Card className="p-3">
        <h5>Total: ${totalPrice}</h5>
        <Button variant="success" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Card>
    </div>
  );
}
