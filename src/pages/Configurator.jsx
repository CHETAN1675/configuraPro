import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import ConfigSummary from "../features/configurator/ConfigSummary";

export default function Configurator() {
  return (
    <div className="container mt-4">
      <Row>
        <Col md={8}>
      <Card className="p-4">
        <h4 className="mb-3">Configurator</h4>

        <p>Select a step to continue:</p>

        <div className="d-flex gap-3 flex-wrap">
          <Link to="/product-type">
            <Button variant="primary">Product Type</Button>
          </Link>

          <Link to="/dimensions">
            <Button variant="outline-primary">Dimensions</Button>
          </Link>
          <Link to="/material">
          <Button variant="outline-primary">Material</Button>
          </Link>
        </div>
        <Col md={4}>
        <ConfigSummary/>
        </Col>
      </Card>
      </Col>
      </Row>
    </div>
  );
}