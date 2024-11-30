const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
    reviews: { type: Number, min: 0, required: true },
    price: { type: Number, min: 0, required: true },
    originalPrice: { type: Number, min: 0, required: true },
    discount: { type: Number, min: 0, max: 100, required: true },
    sizes: [
      {
        value: { type: String, required: true }, // e.g., "1 litre", "500ml"
        price: { type: Number, min: 0, required: true }, // Price for this size
        quantityAvailable: { type: Number, min: 0, required: true }, // Stock for this size
        required: true,
      },
    ],
    // Frontend Quantity: Refers to how many units a user wants to buy.
    // Backend Quantity: Refers to how many units are in stock.
    // Use quantityAvailable to prevent overselling products that are out of stock
    // ------------------------------------------------------------------------------------------------------------
    quantityAvailable: { type: Number, min: 0, required: true },
    // Even if you’re the only seller now, adding this field prepares your system for future multi-seller functionality.
    // Real-world scenario:
    // If other suppliers join your platform later, you can associate each product with its respective seller.
    // Enables features like seller ratings, commissions, or seller-specific dashboards.
    // Advantages:
    // Provides flexibility for business expansion.
    // Simplifies auditing and dispute resolution (e.g., "This batch of honey had issues; who supplied it?").
    // ------------------------------------------------------------------------------------------------------------
    seller: { type: String, required: true }, // Include seller info for multi-vendor support
    // ------------------------------------------------------------------------------------------------------------
    description: { type: String, trim: true }, // Optional product description
    // ------------------------------------------------------------------------------------------------------------
    category: { type: String, required: true, trim: true }, // Useful for filtering products
    // ------------------------------------------------------------------------------------------------------------
    // Real-world scenario: Instead of permanently removing a product (hard delete),
    // isDeleted allows marking it as unavailable while retaining its data for future reference.
    // For example, if a product is temporarily out of stock or discontinued, it can be marked as isDeleted: true.
    // Advantages:
    // Avoids accidental data loss.
    // Helps in analyzing historical data, like which products sold well in the past.
    isDeleted: { type: Boolean, default: false },
  },
  // --------------------------------------------------------------------------------------------------------------
  // Mongoose has a built-in timestamps option that automatically adds createdAt and updatedAt fields to the schema.
  // Real-world scenario:
  // createdAt: Useful for identifying when a product was added to the catalog.
  // updatedAt: Tracks when a product’s details were last modified (e.g., price change or new discount).
  // Advantages:
  // Helps in debugging issues (e.g., "Why was the price updated on X date?").
  // Enables advanced analytics, like identifying trends over time.
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
