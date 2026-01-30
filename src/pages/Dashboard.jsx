import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadOrders } from "../services/orderService";
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const userEmail = useSelector((state) => state.auth.userEmail);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    delivered: 0,
    cancelled: 0,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!userEmail) return;

    const fetchOrders = async () => {
      try {
        const orders = await loadOrders(userEmail);

        const pending = orders.filter(
          (o) => o.status === "CREATED" || o.status === "PENDING"
        ).length;

        const delivered = orders.filter(
          (o) => o.status === "DELIVERED" || o.status === "COMPLETED"
        ).length;

        const cancelled = orders.filter(
          (o) => o.status === "CANCELLED"
        ).length;

        setStats({
          total: orders.length,
          pending,
          delivered,
          cancelled,
        });
      } catch {
        setError("Failed to load order stats");
      }
    };

    fetchOrders();
  }, [userEmail]);

  if (!userEmail) {
    return (
      <div className="mx-auto mt-16 max-w-md rounded-xl border border-yellow-300 bg-yellow-50 p-6 text-center text-yellow-900 shadow-sm">
        Please login to view your dashboard
      </div>
    );
  }

  const percent = (value) =>
    stats.total ? Math.round((value / stats.total) * 100) : 0;

  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of your order activity
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Total */}
        <StatCard
          title="Total Orders"
          value={stats.total}
          subtitle="All time"
          icon={ClipboardDocumentListIcon}
          color="blue"
        />

        {/* Pending */}
        <StatCard
          title="Pending Orders"
          value={stats.pending}
          subtitle={`${percent(stats.pending)}% of total`}
          icon={ClockIcon}
          color="yellow"
        />

        {/* Delivered */}
        <StatCard
          title="Delivered Orders"
          value={stats.delivered}
          subtitle={`${percent(stats.delivered)}% of total`}
          icon={CheckCircleIcon}
          color="green"
        />

        {/* Cancelled */}
        <StatCard
          title="Cancelled Orders"
          value={stats.cancelled}
          subtitle={`${percent(stats.cancelled)}% of total`}
          icon={XCircleIcon}
          color="red"
        />
      </div>
    </div>
  );
}

/* ---------- Stat Card (same style, reusable) ---------- */

function StatCard({ title, value, subtitle, icon: Icon, color }) {
  const colors = {
  blue: {
    bg: `
      bg-gradient-to-br
      from-blue-50 to-white
      dark:from-blue-900/40 dark:to-gray-900
    `,
    icon: "text-blue-600 dark:text-blue-400",
    text: "text-blue-600 dark:text-blue-400",
  },

  yellow: {
    bg: `
      bg-gradient-to-br
      from-yellow-50 to-white
      dark:from-yellow-900/40 dark:to-gray-900
    `,
    icon: "text-yellow-500 dark:text-yellow-400",
    text: "text-yellow-500 dark:text-yellow-400",
  },

  green: {
    bg: `
      bg-gradient-to-br
      from-green-50 to-white
      dark:from-green-900/40 dark:to-gray-900
    `,
    icon: "text-green-600 dark:text-green-400",
    text: "text-green-600 dark:text-green-400",
  },

  red: {
    bg: `
      bg-gradient-to-br
      from-red-50 to-white
      dark:from-red-900/40 dark:to-gray-900
    `,
    icon: "text-red-600 dark:text-red-400",
    text: "text-red-600 dark:text-red-400",
  },
};


  const c = colors[color];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${c.bg} p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:from-gray-800 dark:to-gray-900`}
    >
      <div className="absolute right-4 top-4 opacity-20">
        <Icon className={`h-16 w-16 ${c.icon}`} />
      </div>

      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <p className={`mt-4 text-4xl font-extrabold ${c.text}`}>
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
        {subtitle}
      </p>
    </div>
  );
}
