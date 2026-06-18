// Tiered Pricing Calculator

const calculateTieredPrice = (productId, quantity, pricingTiers) => {
  /**
   * Calculate the unit price based on quantity and pricing tiers
   * @param {number} productId - Product ID
   * @param {number} quantity - Order quantity
   * @param {array} pricingTiers - Array of tier objects with min_quantity, max_quantity, unit_price
   * @returns {object} - { unitPrice, totalPrice, discountPercentage }
   */

  let applicableTier = pricingTiers[0]; // Default to first tier

  for (let tier of pricingTiers) {
    if (quantity >= tier.min_quantity) {
      if (!tier.max_quantity || quantity <= tier.max_quantity) {
        applicableTier = tier;
      }
    }
  }

  const unitPrice = applicableTier.unit_price;
  const totalPrice = unitPrice * quantity;
  const discountPercentage = applicableTier.discount_percentage || 0;

  return {
    unitPrice: parseFloat(unitPrice.toFixed(2)),
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    discountPercentage,
    tier: applicableTier.min_quantity
  };
};

module.exports = { calculateTieredPrice };
