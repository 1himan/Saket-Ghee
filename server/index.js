//server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/saketGhee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello, it's me");
});

// Import the Product model
const Product = require("./models/Product");

// Get all products from database or search based on query
app.get("/products", async (req, res) => {
  const { search } = req.query; // Get search query from URL parameters

  try {
    // Build query based on search parameter
    const query = search
      ? { name: { $regex: search, $options: "i" } } // Case-insensitive partial match
      : {}; // No filter if no search query

    const products = await Product.find(query); // Fetch filtered or all products
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// Admin Routes
app.post("/products", (req, res) => {
  // Create a new product in the database
  res.send("Hello, it's me");
});
app.put("/products/:id", (req, res) => {
  // Update a product in the database
  res.send("Hello, it's me");
});
app.delete("/products/:id", (req, res) => {
  // Delete a product from the database
  res.send("Hello, it's me");
});
