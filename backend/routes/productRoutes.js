const express = require("express");
const Product = require("../model/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  // console.log("here 1");
  try {
    const products = await Product.find();
    // console.log(products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const productData = req.body;
  const product = new Product(productData);

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error });
  }
});

router.get("/product/:productId", async (req, res) => {
  const { productId } = req.params;
  // console.log("Hello : " + productId);

  try {
    const product = await Product.findById(productId); // Await the result from the DB
    // console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product); // Return the product data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
