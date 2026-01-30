import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { setProduct, setMaterial, setCapacity, setDimension, setAddOns } from "../features/configurator/configuratorSlice";
import { selectTotalPrice } from "../features/pricing/pricingSelectors";
import { fetchProductById } from "../services/productService";
import CountUp from "react-countup";

const ADD_ONS = [
  { name: "Warranty", price: 300 },
  { name: "Assembly Service", price: 500 },
  { name: "Delivery Protection", price: 200 },
];

export default function Configurator() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { product, material, capacity, dimension, addOns } = useSelector((s) => s.configurator);
  const total = useSelector(selectTotalPrice);

  // load product
  useEffect(() => {
    const id = params.get("product");
    if (!id) return;

    fetchProductById(id).then((p) => {
      if (p) dispatch(setProduct(p));
    });
  }, [dispatch, params]);

  if (!product) return null;

  const capacityObj = product.capacities?.find((c) => c.name === capacity) || null;

  const handleSaveConfigs = () => {
    if (!material || !capacity) {
      alert("Please select material and capacity");
      return;
    }
    navigate("/config-summary");
  };

  return (
    <section className="mx-auto max-w-6xl p-6">
      <div className="grid gap-10 lg:grid-cols-2">

        {/* Product Image */}
        <div className="flex items-center justify-center rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 shadow-2xl hover:scale-105 transform transition">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="h-72 w-72 object-contain"
            />
          )}
        </div>

        {/* Config Panel */}
        <div className="flex flex-col justify-between rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border border-gray-200 dark:border-gray-700 p-6 shadow-xl space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{product.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">Customize your configuration below.</p>

          {/* Material */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">Material</label>
            <div className="flex flex-wrap gap-2">
              {(product.materials || []).map((m) => (
                <button
                  key={m.name}
                  onClick={() => dispatch(setMaterial(m.name))}
                  className={`px-4 py-2 rounded-full shadow-sm transition transform hover:-translate-y-0.5 hover:shadow-md ${
                    material === m.name
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                  }`}
                >
                  {m.name} (+₹{m.price})
                </button>
              ))}
            </div>
          </div>

          {/* Capacity */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">Capacity</label>
            <div className="flex flex-wrap gap-2">
              {(product.capacities || []).map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    dispatch(setCapacity(c.name));
                    dispatch(setDimension(""));
                  }}
                  className={`px-4 py-2 rounded-full shadow-sm transition transform hover:-translate-y-0.5 hover:shadow-md ${
                    capacity === c.name
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                  }`}
                >
                  {c.name} (+₹{c.price})
                </button>
              ))}
            </div>
          </div>

          {/* Dimension */}
          {capacityObj?.dimensions?.length > 0 && (
            <div className="space-y-2">
              <label className="font-medium text-gray-700 dark:text-gray-300">Dimensions</label>
              <div className="flex flex-wrap gap-2">
                {capacityObj.dimensions.filter(Boolean).map((d, idx) => (
                  <button
                    key={idx}
                    onClick={() => dispatch(setDimension(d))}
                    className={`px-4 py-2 rounded-full shadow-sm transition transform hover:-translate-y-0.5 hover:shadow-md ${
                      dimension === d
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">Add-ons</label>
            <div className="flex flex-wrap gap-2">
              {ADD_ONS.map((a) => (
                <button
                  key={a.name}
                  onClick={() =>
                    dispatch(
                      setAddOns(
                        addOns.includes(a.name)
                          ? addOns.filter((x) => x !== a.name)
                          : [...addOns, a.name]
                      )
                    )
                  }
                  className={`px-3 py-1 rounded-full shadow-sm transition transform hover:-translate-y-0.5 hover:shadow-md ${
                    addOns.includes(a.name)
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                  }`}
                >
                  {a.name} (+₹{a.price})
                </button>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Price</p>
            <p className="mt-1 text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              <CountUp end={total} duration={1.5} prefix="₹" separator="," />
            </p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveConfigs}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white text-lg font-semibold shadow-2xl shadow-blue-600/30 transition transform hover:-translate-y-1 hover:shadow-blue-600/50 active:scale-95"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </section>
  );
}
