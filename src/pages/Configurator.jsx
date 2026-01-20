import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {setProduct,setMaterial,setCapacity,setDimension,setAddOns} from "../features/configurator/configuratorSlice";
import { selectTotalPrice } from "../features/pricing/pricingSelectors";
import { fetchProductById } from "../services/productService";
import { Card, Form, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const ADD_ONS = [
  { name: "Warranty", price: 300 },
  { name: "Assembly Service", price: 500 },
  { name: "Delivery Protection", price: 200 }
];

export default function Configurator() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { product, material, capacity, dimension, addOns } =
    useSelector((s) => s.configurator);

  const total = useSelector(selectTotalPrice);

  // load product once via ?product=ID
  useEffect(() => {
    const id = params.get("product");
    if (!id) return;

    fetchProductById(id).then((p) => {
      if (p) dispatch(setProduct(p));
    });
  }, [dispatch, params]);

  if (!product) return null;

  const handleSaveConfigs = () => {
    // Optional validation
    if (!material || !capacity) {
      alert("Please select material and capacity");
      return;
    }

    navigate("/config-summary");
  };
  // find selected capacity object
  const capacityObj =
    product.capacities?.find((c) => c.name === capacity) || null;

  

  return (
    <div className="container mt-4">
      <Card className="p-4">
        <h3 className="mb-4">Configure {product.name}</h3>

        {product.image && (
          <Image
            src={product.image}
            fluid
            rounded
            className="mb-4"
            style={{ maxHeight: 220, objectFit: "contain" }}
          />
        )}

        {/* Material */}
        <Form.Group className="mb-3">
          <Form.Label>Material</Form.Label>
          <Form.Select
            value={material}
            onChange={(e) => dispatch(setMaterial(e.target.value))}
          >
            <option value="">Select material</option>
            {(product.materials || []).map((m) => (
              <option key={m.name} value={m.name}>
                {m.name} (+₹{m.price})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Capacity */}
        <Form.Group className="mb-3">
          <Form.Label>Capacity</Form.Label>
          <Form.Select
            value={capacity}
            onChange={(e) => {
              dispatch(setCapacity(e.target.value));
              dispatch(setDimension("")); // reset dimension when capacity changes
            }}
          >
            <option value="">Select capacity</option>
            {(product.capacities || []).map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} (+₹{c.price})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Dimension */}
        {capacityObj && capacityObj.dimensions && (
          <Form.Group className="mb-3">
            <Form.Label>Dimensions</Form.Label>
            <Form.Select
              value={dimension}
              onChange={(e) => dispatch(setDimension(e.target.value))}
            >
              <option value="">Select dimension</option>
              {capacityObj.dimensions
                .filter(Boolean)
                .map((d, idx) => (
                  <option key={idx} value={d}>
                    {d}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        )}

        {/* Add-ons */}
        <Form.Group className="mb-3">
          <Form.Label>Add-ons</Form.Label>
          {ADD_ONS.map((a) => (
            <Form.Check
              key={a.name}
              label={`${a.name} (+₹${a.price})`}
              checked={addOns.includes(a.name)}
              onChange={() =>
                dispatch(
                  setAddOns(
                    addOns.includes(a.name)
                      ? addOns.filter((x) => x !== a.name)
                      : [...addOns, a.name]
                  )
                )
              }
            />
          ))}
        </Form.Group>

        {/* Total */}
        <h4 className="mt-3">Total Price: ₹{total}</h4>

        <Button size="lg" className="mt-3"onClick={handleSaveConfigs} >
          Save
        </Button>
      </Card>
    </div>
  );
}  