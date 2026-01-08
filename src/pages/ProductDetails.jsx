import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { getProductById } from "../utils/products";

export default function ProductDetails() {
  const { productId } = useParams();
  const product = getProductById(productId);

  if (!product) {
    return <p className="mt-4">Product not found</p>;
  }

  return (
    <div className="container mt-4">
      <Card className="p-4">
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <p>
          <strong>Base Price:</strong> ${product.basePrice}
        </p>

        <Link to={`/configurator?product=${product.id}`}>
          <Button variant="success">
            Configure Product
          </Button>
        </Link>
      </Card>
    </div>
  );
}
