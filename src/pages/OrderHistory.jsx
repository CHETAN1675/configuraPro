import { useEffect, useState } from "react";
import { Card, ListGroup, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { loadOrders } from "../services/orderService";

export default function OrderHistory() {
  const userEmail = useSelector(
    (state) => state.auth.userEmail
  );

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await loadOrders(userEmail);
        setOrders(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrders();
  }, [userEmail]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (orders.length === 0) {
    return <p className="mt-4">No orders found</p>;
  }

  return (
    <div className="container mt-4">
      <h3>Order History</h3>

      {orders.map((order) => (
        <Card key={order.id} className="mb-3 p-3">
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          <ListGroup>
            {order.items.map((item, index) => (
              <ListGroup.Item key={index}>
                <strong>
                  {item.product?.name || "Product"}
                </strong>{" "}
                — ${item.totalPrice}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <h6 className="mt-2">
            Total: ${order.totalPrice}
          </h6>
        </Card>
      ))}
    </div>
  );
}
