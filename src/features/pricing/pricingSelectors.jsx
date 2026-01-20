const ADD_ON_PRICES = {
  Warranty: 300,
  "Assembly Service": 500,
  "Delivery Protection": 200,
};

export const selectTotalPrice = (state) => {
  const cfg = state.configurator;
  if (!cfg) return 0;

  const { product, material, capacity, addOns } = cfg;
  let total = 0;

  // material
  if (material && product?.materials) {
    const matObj = product.materials.find((m) => m.name === material);
    if (matObj) total += Number(matObj.price) || 0;
  }

  // capacity
  if (capacity && product?.capacities) {
    const capObj = product.capacities.find((c) => c.name === capacity);
    if (capObj) total += Number(capObj.price) || 0;
  }

  // add-ons
  if (Array.isArray(addOns)) {
    addOns.forEach((aName) => {
      total += ADD_ON_PRICES[aName] || 0;
    });
  }

  return total;
};
