import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function Configurator() {
  return (
    <div className="container mt-4">
      <Card className="p-4">
        <h4 className="mb-3">Configurator</h4>

        <p>Select a step to continue:</p>

        <div className="d-flex gap-3">
          <Link to="/product-type">
            <Button variant="primary">Product Type</Button>
          </Link>

          <Link to="/dimensions">
            <Button variant="outline-primary">Dimensions</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
