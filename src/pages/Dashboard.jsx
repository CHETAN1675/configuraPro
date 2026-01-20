import { useEffect, useState } from "react";
import { Card, Row, Col, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { loadOrders } from "../services/orderService";

export default function Dashboard() {
  const userEmail = useSelector((state) => state.auth.userEmail);

  const [stats, setStats] = useState({
    pending: 0,
    delivered: 0,
    cancelled: 0,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!userEmail) return;

    const fetchOrders = async () => {
      try {
        const orders = await loadOrders(userEmail);

        const pending = orders.filter(
          (o) => o.status === "CREATED" || o.status === "PENDING"
        ).length;

        const delivered = orders.filter(
          (o) => o.status === "DELIVERED" || o.status === "COMPLETED"
        ).length;

        const cancelled = orders.filter(
          (o) => o.status === "CANCELLED"
        ).length;

        setStats({ pending, delivered, cancelled });
      } catch (err) {
        setError("Failed to load order stats");
      }
    };

    fetchOrders();
  }, [userEmail]);

  if (!userEmail) {
    return <Alert variant="warning">Please login</Alert>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Dashboard</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={4}>
          <Card className="text-center p-4">
            <h6 className="text-muted">Pending Orders</h6>
            <h2 className="text-warning">{stats.pending}</h2>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center p-4">
            <h6 className="text-muted">Delivered Orders</h6>
            <h2 className="text-success">{stats.delivered}</h2>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center p-4">
            <h6 className="text-muted">Cancelled Orders</h6>
            <h2 className="text-danger">{stats.cancelled}</h2>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
