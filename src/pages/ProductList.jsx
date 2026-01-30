// components/ProductList.jsx
import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../services/productService";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts()
      .then((p) => setProducts(p || []))
      .finally(() => setLoading(false));
  }, []);

  /* Search Filter  */
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;

    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  /* Loader  */
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-gray-700" />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Product Catalog
          </h1>
          <p className="mt-2 max-w-xl text-gray-500 dark:text-gray-400">
            Choose a base product and customize it to your exact requirements.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900
                       placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20
                       dark:border-gray-700 dark:bg-gray-900 dark:text-gray-800 dark:placeholder-gray-500"
          />
        </div>
      </div>

      {/* Empty state */}
      {!filteredProducts.length && (
        <div className="mt-20 text-center text-gray-500 dark:text-gray-400">
          No products found matching{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            “{search}”
          </span>
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="group relative overflow-hidden rounded-3xl border bg-white/70 p-6 shadow-sm backdrop-blur
                       transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                       dark:border-gray-800 dark:bg-gray-900/60"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 hidden rounded-3xl ring-1 ring-white/10 dark:block" />

            {/* Image */}
            {p.image && (
              <div className="mb-6 flex h-44 items-center justify-center rounded-2xl
                              bg-gradient-to-br from-gray-50 to-white
                              dark:from-gray-800 dark:to-gray-900">
                <img
                  src={p.image}
                  alt={p.name}
                  className="max-h-36 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            {/* Content */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {p.name}
            </h2>

            <div className="mt-3 space-y-1 text-sm text-gray-500 dark:text-gray-400">
              <p>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Materials:
                </span>{" "}
                {p.materials?.length
                  ? p.materials.map((m) => m.name).join(", ")
                  : "—"}
              </p>

              <p>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Capacities:
                </span>{" "}
                {p.capacities?.length
                  ? p.capacities.map((c) => c.name).join(", ")
                  : "—"}
              </p>
            </div>

            {/* CTA */}
            <Link
              to={`/products/${p.id}`}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl
                         bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5
                         text-sm font-semibold text-white shadow-lg shadow-blue-600/20
                         transition hover:opacity-90"
            >
              View & Configure
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
