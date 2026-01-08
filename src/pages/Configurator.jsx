import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setProduct } from "../features/configurator/configuratorSlice";
import { getProductById } from "../utils/products";
import ConfigSummary from "../features/configurator/ConfigSummary";

export default function Configurator() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const productId = searchParams.get("product");
    if (productId) {
      const product = getProductById(productId);
      if (product) {
        dispatch(setProduct(product));
      }
    }
  }, [dispatch, searchParams]);

  return (
    <div className="container mt-4">
      <ConfigSummary />
    </div>
  );
}
