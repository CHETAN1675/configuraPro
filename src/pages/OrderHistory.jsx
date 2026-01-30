import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadOrders, updateOrderStatus } from "../services/orderService";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function OrderHistory() {
  const userEmail = useSelector((state) => state.auth.userEmail);

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState("ALL");

  /* ---------- Fetch Orders ---------- */
  useEffect(() => {
    if (!userEmail) return;

    loadOrders(userEmail)
      .then(setOrders)
      .catch((e) => setError(e.message));
  }, [userEmail]);

  /* ---------- Date Filter ---------- */
  const filteredOrders = orders.filter((order) => {
    if (dateFilter === "ALL") return true;

    const orderDate = new Date(order.createdAt);
    const now = new Date();

    if (dateFilter === "TODAY") {
      return orderDate.toDateString() === now.toDateString();
    }

    if (dateFilter === "7_DAYS") {
      return now - orderDate <= 7 * 24 * 60 * 60 * 1000;
    }

    if (dateFilter === "30_DAYS") {
      return now - orderDate <= 30 * 24 * 60 * 60 * 1000;
    }

    return true;
  });

  /* ---------- Cancel Order ---------- */
  const handleCancelOrder = async (orderId) => {
    if (!confirm("Cancel this order?")) return;

    await updateOrderStatus(userEmail, orderId, "CANCELLED");
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: "CANCELLED" } : o
      )
    );
  };

  /* ---------- Guards ---------- */
  if (!userEmail) {
    return (
      <div className="mt-6 flex items-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-yellow-400">
        <ExclamationTriangleIcon className="h-5 w-5" />
        Please login to view your orders
      </div>
    );
  }

  if (error) {
    return <p className="mt-4 text-red-500">{error}</p>;
  }

  if (!orders.length) {
    return <p className="mt-6 text-gray-500">No orders found</p>;
  }

  if (!filteredOrders.length) {
    return (
      <p className="mt-6 text-center text-gray-500 dark:text-gray-400">
        No orders found for selected date range
      </p>
    );
  }

  /* ---------- Status Styles ---------- */
  const statusStyles = {
    CREATED: "bg-blue-500/10 text-blue-500",
    CANCELLED: "bg-red-500/10 text-red-500",
    DELIVERED: "bg-green-500/10 text-green-500",
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Order History
      </h2>

      {/* Date Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { label: "All", value: "ALL" },
          { label: "Today", value: "TODAY" },
          { label: "Last 7 Days", value: "7_DAYS" },
          { label: "Last 30 Days", value: "30_DAYS" },
        ].map((f) => (
          <button
            key={f.value}
            aria-pressed={dateFilter === f.value}
            onClick={() => setDateFilter(f.value)}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition
              ${
                dateFilter === f.value
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Orders */}
      {filteredOrders.map((order) => (
        <div
          key={order.id}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm
                     dark:border-gray-800 dark:bg-gray-900"
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusStyles[order.status] ||
                "bg-gray-500/10 text-gray-500"
              }`}
            >
              {order.status}
            </span>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {(order.items || []).map((item, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-xl bg-gray-50 p-3 dark:bg-gray-800"
              >
                {item.product?.image && (
                  <img
                    src={item.product.image}
                    alt={item.product?.name}
                    className="h-16 w-16 rounded-lg bg-white p-1 object-contain"
                  />
                )}

                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.product?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.capacity} · {item.material}
                  </p>
                </div>

                <div className="font-semibold text-gray-900 dark:text-white">
                  ₹{item.totalPrice}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t pt-4 dark:border-gray-800">
            <div className="text-sm text-gray-500">
              Payment: {order.paymentMethod?.type} (
              {order.paymentMethod?.status})
            </div>

            <div className="text-lg font-bold text-gray-900 dark:text-white">
              ₹{order.totalPrice}
            </div>
          </div>

          {/* Cancel */}
          {order.status === "CREATED" && (
            <div className="mt-4 text-right">
              <button
                onClick={() => handleCancelOrder(order.id)}
                className="rounded-lg border border-red-500/30 px-4 py-2
                           text-sm font-semibold text-red-500
                           hover:bg-red-500/10"
              >
                Cancel Order
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
