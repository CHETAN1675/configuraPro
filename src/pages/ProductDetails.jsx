// components/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-gray-700" />
      </div>
    );
  }

  if (!product) {
    return (
      <p className="mt-20 text-center text-gray-500 dark:text-gray-400">
        Product not found
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="flex items-center justify-center rounded-3xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-sm dark:from-gray-800 dark:to-gray-900">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="max-h-80 object-contain"
            />
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Customize this product by selecting materials, capacities, and
            configuration options tailored to your needs.
          </p>

          <div className="mt-6 space-y-3 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-800 dark:text-gray-300">
                Materials:
              </span>{" "}
              {product.materials?.length
                ? product.materials.map((m) => m.name).join(", ")
                : "—"}
            </p>

            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-800 dark:text-gray-300">
                Capacities:
              </span>{" "}
              {product.capacities?.length
                ? product.capacities.map((c) => c.name).join(", ")
                : "—"}
            </p>
          </div>

          <Link
            to={`/configurator?product=${product.id}`}
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-600/30 transition hover:opacity-90"
          >
            Configure Product
          </Link>
        </div>
      </div>
    </section>
  );
}
