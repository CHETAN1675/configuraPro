import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveCart } from "../services/cartService";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const totalPrice = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    dispatch(saveCart(userEmail, updatedItems));
  };

  const handleClearCart = () => {
    dispatch(saveCart(userEmail, []));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (!items.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Your cart is empty 🛒
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl p-6">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
        Shopping Cart
      </h2>

      <div className="space-y-4">
        <AnimatePresence>
          {items.map((item, index) => {
            const { product, productType, dimensions = {}, capacity, material, addOns = [], totalPrice } = item;
            const dimensionText =
              dimensions.width && dimensions.height && dimensions.depth
                ? `${dimensions.width} × ${dimensions.height} × ${dimensions.depth}`
                : "-";

            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow hover:shadow-lg transition"
              >
                {/* Product Image */}
                {product?.image && (
                  <div className="flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-24 w-24 object-contain rounded-xl"
                    />
                  </div>
                )}

                {/* Product Details */}
                <div className="flex-grow space-y-1 text-gray-800 dark:text-gray-400">
                  <h3 className="font-semibold text-lg">{product?.name || "Product"}</h3>
                  <p className="text-sm">
                    <span className="font-medium">Type:</span> {productType || "-"} <br />
                    <span className="font-medium">Capacity:</span> {capacity || "-"} <br />
                    <span className="font-medium">Material:</span> {material || "-"} <br />
                    <span className="font-medium">Dimensions:</span> {dimensionText} <br />
                    <span className="font-medium">Add-ons:</span> {addOns.length ? addOns.join(", ") : "-"}
                  </p>
                </div>

                {/* Price & Remove */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                    ₹{totalPrice || 0}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="px-4 py-1 rounded-lg bg-red-600 text-white text-sm font-medium shadow hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Cart Summary */}
      <div className="mt-6 p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          Total: ₹{totalPrice}
        </h3>
        <div className="flex gap-3">
          <button
            onClick={handleClearCart}
            className="px-5 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90 transition transform hover:-translate-y-1 active:scale-95"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
