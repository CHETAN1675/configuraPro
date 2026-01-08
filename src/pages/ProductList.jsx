import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { products } from "../utils/products";

export default function ProductList() {
  return (
    <div className="container mt-4">
      <h3 className="mb-3">Product Catalog</h3>

      {products.map((product) => (
        <Card key={product.id} className="p-3 mb-3">
          <h5>{product.name}</h5>
          <p>{product.description}</p>

          <Link to={`/products/${product.id}`}>
            <Button>View Details</Button>
          </Link>
        </Card>
      ))}
    </div>
  );
}
