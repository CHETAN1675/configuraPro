import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="container mt-5">
      <Card className="p-4 text-center">
        <h3 className="mb-3">Order Placed Successfully </h3>
        <p>Your order has been saved. Thank you for shopping with us.</p>

        <div className="d-flex justify-content-center gap-3 mt-3">
          <Link to="/dashboard">
            <Button variant="primary">Go to Dashboard</Button>
          </Link>

          <Link to="/orders">
            <Button variant="outline-secondary">
              View Orders
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
