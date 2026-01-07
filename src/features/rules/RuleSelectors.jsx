import { validateConfiguration } from "./RulesEngine";

export const selectConfigurationErrors = (state) => {
  return validateConfiguration(state.configurator);
};

export const selectPrimaryError = (state) => {
  const errors = validateConfiguration(state.configurator);
  return errors.length > 0 ? errors[0] : "";
};

export const selectWarnings = (state) => {
  const warnings = [];
  const config = state.configurator;

  if (config.capacity === "Medium" && config.material === "Plastic") {
    warnings.push("Plastic with Medium capacity may reduce durability");
  }

  return warnings;
};

export const selectDisabledAddOns = (state) => {
  const { capacity, material } = state.configurator;

  return {
    "Assembly Service": capacity === "Small",
    Warranty: material === "Plastic",
    "Delivery Protection": false,
  };
};
