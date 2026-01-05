import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function ProductType() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: "24rem" }}>
        <Card.Body>
          <Card.Title>Select Product Type</Card.Title>

          <div className="d-grid gap-2 mt-3">
            <Button variant="outline-primary">Standard Product</Button>
            <Button variant="outline-primary">Custom Product</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
