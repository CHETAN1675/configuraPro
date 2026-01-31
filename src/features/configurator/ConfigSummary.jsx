import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTotalPrice } from "../pricing/pricingSelectors";
import { saveCart } from "../../services/cartService";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { openAuthModal } from "../../features/auth/authSlice";


export default function ConfigSummary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, material, capacity, dimension, addOns } = useSelector(
    (s) => s.configurator
  );
 
  const total = useSelector(selectTotalPrice);
  const cartItems = useSelector((s) => s.cart.items);
  const userEmail = useSelector((s) => s.auth.userEmail);

  const [animatedTotal, setAnimatedTotal] = useState(0);

  useEffect(() => {
    setAnimatedTotal(total);
  }, [total]);

  if (!product) return null;

  const handleAddToCart = () => {
    
    if (!userEmail) {
      dispatch(openAuthModal());
    }

   
    
    const cartItem = {
      id: Date.now(),
      product,
      productType: product.name,
      dimensions: dimension,
      capacity,
      material,
      addOns,
      totalPrice: total,
    };

    dispatch(saveCart(userEmail, [...cartItems, cartItem]));
    navigate("/cart");
  };

  return (
    <section className="mx-auto max-w-6xl p-6">
      <div className="grid gap-10 lg:grid-cols-2">

        {/* Left: Product Image */}
        <div className="relative flex items-center justify-center">
          <div className="rounded-3xl bg-gradient-to-br from-blue-50/30 to-indigo-50/30 dark:from-gray-800/50 dark:to-gray-900/50 p-6 shadow-2xl transform transition hover:scale-105">
            <img
              src={product.image}
              alt={product.name}
              className="h-72 w-72 object-contain"
            />
          </div>
        </div>

        {/* Right: Config Panel */}
        <div className="flex flex-col justify-between rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border border-gray-200 dark:border-gray-700 p-6 shadow-xl space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {product.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Review your configuration and selected options below.
          </p>

          {/* Details */}
          <div className="grid gap-3">
            {[["Material", material], ["Capacity", capacity], ["Dimension", dimension]].map(
              ([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between items-center rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 px-4 py-2 shadow-sm transition hover:shadow-md"
                >
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {label}:
                  </span>
                  <span className="text-gray-900 dark:text-white">{value || "-"}</span>
                </div>
              )
            )}

            {/* Add-ons with Tailwind tooltips */}
            <div className="flex flex-col space-y-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Add-ons:
              </span>
              {addOns.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {addOns.map((addon, idx) => (
                    <div key={idx} className="relative group">
                      <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-700 dark:to-indigo-800 px-3 py-1 text-xs font-semibold text-gray-900 dark:text-white shadow-sm transition transform hover:-translate-y-0.5 hover:shadow-md">
                        {addon}
                      </span>
                      <div className="absolute bottom-full mb-2 hidden w-max rounded bg-gray-800 px-2 py-1 text-xs text-white text-center group-hover:block whitespace-nowrap shadow-lg">
                        Extra cost: ₹{addon === "Warranty" ? 300 : addon === "Assembly Service" ? 500 : 200}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500 dark:text-gray-400">—</span>
              )}
            </div>
          </div>

          {/* Animated Total */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Price</p>
            <p className="mt-1 text-4xl font-extrabold text-blue-600 dark:text-blue-400">
              <CountUp end={animatedTotal} duration={1.5} separator="," prefix="₹" />
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white text-lg font-semibold shadow-2xl shadow-blue-600/30 transition transform hover:-translate-y-1 hover:shadow-blue-600/50 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
