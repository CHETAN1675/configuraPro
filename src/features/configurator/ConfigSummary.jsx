import { Card, Button,Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTotalPrice } from "../pricing/pricingSelectors";
import { saveCart } from "../../services/cartService";

export default function ConfigSummary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    product,
    material,
    capacity,
    dimension,
    addOns,
  } = useSelector((s) => s.configurator);

  const total = useSelector(selectTotalPrice);
  const cartItems = useSelector((s) => s.cart.items);
  const userEmail = useSelector((s) => s.auth.userEmail);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!userEmail) return;

    // convert "5x6x7" → dimensions object
    let dimensionsObj = {};
    if (dimension && dimension.includes("x")) {
      const [width, height, depth] = dimension.split("x");
      dimensionsObj = {
        width,
        height,
        depth,
      };
    }

    const cartItem = {
      id: Date.now(),
      product,
      productType: product.name,
      dimensions: dimensionsObj,
      capacity,
      material,
      addOns,
      totalPrice: total,
    };

    dispatch(saveCart(userEmail, [...cartItems, cartItem]));
    navigate("/cart");
  };

  return (
    <div className="container mt-4">
      <Card className="p-4">
        <h4>Configuration Summary</h4>
        {product.image && (
        <Image
        src={product.image}
        fluid
        rounded
        className="my-3"
        style={{ maxHeight: 200, objectFit: "contain" }}
        />
        )}
        <p><strong>Product:</strong> {product.name}</p>
        <p><strong>Material:</strong> {material || "-"}</p>
        <p><strong>Capacity:</strong> {capacity || "-"}</p>
        <p><strong>Dimension:</strong> {dimension || "-"}</p>
        <p><strong>Add-ons:</strong> {addOns.length ? addOns.join(", ") : "-"}</p>

        <h5 className="mt-3">Total: ₹{total}</h5>

        <Button className="mt-3" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Card>
    </div>
  );
}
