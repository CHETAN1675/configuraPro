export function validateConfiguration(config) {
  const errors = [];

  // Capacity vs Material
  if (config.capacity === "Large" && config.material === "Plastic") {
    errors.push("Plastic material is not available for large capacity");
  }

  // AddOns vs Capacity
  if (
    config.addOns.includes("Assembly Service") &&
    config.capacity === "Small"
  ) {
    errors.push("Assembly Service is not available for Small capacity");
  }

  // AddOns vs Material
  if (
    config.addOns.includes("Warranty") &&
    config.material === "Plastic"
  ) {
    errors.push("Warranty is not available for Plastic material");
  }

  return errors;
}
