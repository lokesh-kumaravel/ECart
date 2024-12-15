const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const UserRoutes = require("./routes/UserRoutes");
const cartRoutes = require("./routes/cartRoutes");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 3000;
// console.log("Stripe Secret Key:", process.env.STRIPE_SECRET);

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: "Products array is required." });
  }

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        images: [product.image], // Send image URLs as an array
      },
      unit_amount: product.price * 100, // Price in cents
    },
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3001/success",
      cancel_url: "http://localhost:3001/failure",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.post("/create-checkout-session", async (req, res) => {
//   const { products } = req.body;
//   console.log("sldkfjnvldfvn");
//   if (!products || !Array.isArray(products) || products.length === 0) {
//     return res
//       .status(400)
//       .json({ error: "Products are required and must be an array" });
//   }
//   const lineItems = products.map((product) => ({
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: product.name,
//         image: [product.image],
//       },
//       unit_amount: product.price * 100,
//     },
//     quantity: product.quantity,
//   }));

//   const session = await stripr.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: lineItems,
//     mode: "payment",
//     success_url: "http://localhost:3000/success",
//     cancel_url: "http://localhost:3000/failure",
//   });

//   res.json({ id: session.id });
// });
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecom", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/products", productRoutes);
app.use("/api/users", UserRoutes);
app.use("/api", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
