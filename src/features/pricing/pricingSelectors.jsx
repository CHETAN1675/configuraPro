import {
  BASE_PRICES,
  CAPACITY_MULTIPLIER,
  MATERIAL_PRICES,
  ADDON_PRICES,
} from "./pricingUtils";

export const selectBasePrice = (state) => {
  const { productType } = state.configurator;
  return BASE_PRICES[productType] || 0;
};

export const selectCapacityPrice = (state) => {
  const { capacity } = state.configurator;
  return CAPACITY_MULTIPLIER[capacity] || 1;
};

export const selectMaterialPrice = (state) => {
  const { material } = state.configurator;
  return MATERIAL_PRICES[material] || 0;
};

export const selectAddOnsPrice = (state) => {
  const { addOns } = state.configurator;

  return addOns.reduce((total, addOn) => {
    return total + (ADDON_PRICES[addOn] || 0);
  }, 0);
};

export const selectTotalPrice = (state) => {
  const basePrice = selectBasePrice(state);
  const capacityMultiplier = selectCapacityPrice(state);
  const materialPrice = selectMaterialPrice(state);
  const addOnsPrice = selectAddOnsPrice(state);

  return Math.round(basePrice * capacityMultiplier + materialPrice + addOnsPrice);
};
