import { useEffect, useState } from "react";
import { Card, ListGroup, Alert, Badge, Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { loadOrders, updateOrderStatus } from "../services/orderService";

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

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await updateOrderStatus(userEmail, orderId, "CANCELLED");
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: "CANCELLED" } : o
        )
      );
    } catch {
      alert("Failed to cancel order");
    }
  };

  if (!userEmail) {
    return (
      <Alert variant="warning" className="mt-4">
        Please login to view your orders
      </Alert>
    );
  }

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (!orders.length) return <p className="mt-4">No orders found</p>;

  return (
    <div className="container mt-4">
      <h3>Order History</h3>

      {orders.map((order) => (
        <Card key={order.id} className="mb-4 p-3">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <strong>Order Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <Badge bg={order.status === "CANCELLED" ? "danger" : "secondary"}>
              {order.status || "CREATED"}
            </Badge>
          </div>

          {/* Items */}
          <ListGroup className="mb-3">
            {(order.items || []).map((item, idx) => {
              const dims = item.dimensions || {};
              const dimensionText =
                dims.width && dims.height && dims.depth
                  ? `${dims.width}×${dims.height}×${dims.depth}`
                  : "-";

              return (
                <ListGroup.Item key={idx}>
                  <div className="d-flex gap-3 align-items-start">
                    {item.product?.image && (
                      <Image
                        src={item.product.image}
                        rounded
                        style={{
                          width: 70,
                          height: 70,
                          objectFit: "contain",
                          flexShrink: 0,
                        }}
                      />
                    )}

                    <div className="flex-grow-1">
                      <strong>{item.product?.name || "Product"}</strong>
                      <div className="text-muted small">
                        Capacity: {item.capacity || "-"} <br />
                        Material: {item.material || "-"} <br />
                        Dimensions: {dimensionText} <br />
                        Add-ons:{" "}
                        {item.addOns?.length
                          ? item.addOns.join(", ")
                          : "-"}
                      </div>
                    </div>

                    <div className="fw-bold">₹{item.totalPrice || 0}</div>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>

          {/* Footer */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Payment:</strong>{" "}
              {order.paymentMethod
                ? `${order.paymentMethod.type} (${order.paymentMethod.status})`
                : "Pending"}
            </div>

            <strong>Total: ₹{order.totalPrice}</strong>
          </div>

          {/* Cancel */}
          {order.status === "CREATED" && (
            <div className="mt-3 text-end">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleCancelOrder(order.id)}
              >
                Cancel Order
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
