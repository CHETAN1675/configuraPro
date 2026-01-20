// components/ProductList.jsx
import { useEffect, useState } from "react";
import { Card, Button, Image, Spinner } from "react-bootstrap";
import { fetchProducts } from "../services/productService";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((p) => setProducts(p || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner className="m-4" />;

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Product Catalog</h3>

      {products.length === 0 && <p>No products available</p>}

      {products.map((p) => (
        <Card key={p.id} className="p-3 mb-3">
          {p.image && (
            <Image
              src={p.image}
              alt={p.name}
              rounded
              fluid
              style={{ maxHeight: 180, objectFit: "contain" }}
              className="mb-2"
            />
          )}

          <h5>{p.name}</h5>

          <p className="text-muted mb-1">
            Materials:{" "}
            {p.materials && p.materials.length
              ? p.materials.map((m) => m.name).join(", ")
              : "—"}
          </p>

          <p className="text-muted mb-2">
            Capacities:{" "}
            {p.capacities && p.capacities.length
              ? p.capacities.map((c) => c.name).join(", ")
              : "—"}
          </p>

          <Link to={`/products/${p.id}`}>
            <Button variant="primary">View & Configure</Button>
          </Link>
        </Card>
      ))}
    </div>
  );
}
