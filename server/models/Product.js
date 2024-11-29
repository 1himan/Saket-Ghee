const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  quantityAvailable: { type: Number, required: true }
});

module.exports = mongoose.model("Product", productSchema);