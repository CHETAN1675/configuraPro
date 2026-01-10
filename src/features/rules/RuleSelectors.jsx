import { validateConfiguration } from "./RulesEngine";

export const selectConfigurationErrors = (state) => {
  return validateConfiguration(state.configurator);
};

export const selectPrimaryError = (state) => {
  const errors = validateConfiguration(state.configurator);
  return errors.length > 0 ? errors[0] : "";
};

export const selectDisabledAddOns = (state) => {
  const { capacity, material } = state.configurator;

  return {
    "Assembly Service": capacity === "Small",
    Warranty: material === "Plastic",
    "Delivery Protection": false,
  };
};
