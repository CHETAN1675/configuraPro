import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setProduct } from "./configuratorSlice";
import { fetchProductById } from "../../services/productService";

export default function ConfiguratorLoader({ children }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const productId = searchParams.get("product");
    if (!productId) return;

    fetchProductById(productId).then((product) => {
      dispatch(setProduct(product));
    });
  }, [dispatch, searchParams]);

  return children;
}
