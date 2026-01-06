import { Container, Card, Form, Button } from "react-bootstrap";

export default function AddOns() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add-ons selected");
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <h4 className="mb-3">Select Add-ons</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Check
            type="checkbox"
            label="Extended Warranty"
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            label="Installation Service"
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            label="Premium Support"
            className="mb-3"
          />

          <Button type="submit">
            Save Add-ons
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
