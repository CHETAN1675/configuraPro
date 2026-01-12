import { useEffect, useState } from "react";
import { Card, ListGroup, Alert, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { loadOrders } from "../services/orderService";

export default function OrderHistory() {
  const userEmail = useSelector((state) => state.auth.userEmail);

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userEmail) return;

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

  if (!userEmail) {
    return (
      <Alert variant="warning" className="mt-4">
        Please login to view your orders
      </Alert>
    );
  }

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
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <strong>Order Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <Badge bg="secondary">
              {order.status || "CREATED"}
            </Badge>
          </div>

          <ListGroup className="mb-2">
            {order.items.map((item, index) => (
              <ListGroup.Item key={index}>
                <strong>
                  {item.product?.name || "Product"}
                </strong>{" "}
                — ${item.totalPrice}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="d-flex justify-content-between">
            <div>
              <strong>Payment:</strong>{" "}
              {order.paymentMethod?.type || "N/A"} (
              {order.paymentMethod?.status || "PENDING"})
            </div>
            <strong>Total: ${order.totalPrice}</strong>
          </div>
        </Card>
      ))}
    </div>
  );
}
