import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { saveOrder } from "../services/orderService";
import { saveCart } from "../services/cartService";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const totalPrice = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

  const handlePlaceOrder = async () => {
    try {
      await saveOrder(userEmail, {
        items,
        totalPrice,
        paymentMethod: { type: paymentMethod, status: "PENDING" },
        status: "CREATED",
      });

      dispatch(clearCart());
      dispatch(saveCart(userEmail, []));
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      alert("Order failed. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Your cart is empty 🛒
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl p-6">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
        Checkout
      </h2>

      {/* Items List */}
      <div className="space-y-4">
        <AnimatePresence>
          {items.map((item, idx) => {
            const { product, productType, capacity, material, totalPrice } = item;
            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  {product?.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-20 w-20 object-contain rounded-lg"
                    />
                  )}
                  <div className="text-gray-800 dark:text-gray-300">
                    <h3 className="font-semibold">{product?.name}</h3>
                    <p className="text-sm">
                      {productType} | {capacity} | {material}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-extrabold text-blue-600 dark:text-blue-400 text-lg">
                    ₹{totalPrice}
                  </span>
                  <button
                    onClick={() => {
                      const updatedItems = items.filter((_, i) => i !== idx);
                      dispatch(saveCart(userEmail, updatedItems));
                    }}
                    className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm font-medium shadow hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Payment Method */}
      <div className="mt-6 p-4 bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-2xl shadow">
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="CARD">Card</option>
          <option value="UPI">UPI</option>
        </select>
      </div>

      {/* Total & Place Order */}
      <div className="mt-6 p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          Total: ₹{totalPrice}
        </h3>
        <button
          onClick={handlePlaceOrder}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-2xl hover:opacity-90 transition transform hover:-translate-y-1 active:scale-95"
        >
          Place Order
        </button>
      </div>
    </section>
  );
}
