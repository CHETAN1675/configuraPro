// components/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Spinner, Image } from "react-bootstrap";
import { fetchProductById } from "../services/productService";

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductById(productId)
      .then((p) => setProduct(p))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <Spinner className="m-4" />;
  if (!product) return <p className="mt-4">Product not found</p>;

  return (
    <div className="container mt-4">
      <Card className="p-4">
        {product.image && (
          <Image
            src={product.image}
            fluid
            rounded
            className="mb-3"
            style={{ maxHeight: "250px", objectFit: "contain" }}
          />
        )}

        <h4>{product.name}</h4>

        <p className="text-muted mb-2">
          Materials:{" "}
          {product.materials && product.materials.length
            ? product.materials.map((m) => m.name).join(", ")
            : "—"}
        </p>

        <p className="text-muted">
          Capacities:{" "}
          {product.capacities && product.capacities.length
            ? product.capacities.map((c) => c.name).join(", ")
            : "—"}
        </p>

        <Link to={`/configurator?product=${product.id}`}>
          <Button variant="success" className="mt-3">
            Configure Product
          </Button>
        </Link>
      </Card>
    </div>
  );
}
