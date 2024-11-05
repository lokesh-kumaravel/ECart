const express = require("express");
const router = express.Router();
const User = require("../model/User");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/cart/add", authenticateToken, async (req, res) => {
  try {
    const { proid } = req.body;  
    const userId = req.user.id; 
    console.log(proid);

 
    let user = await User.findById(userId);
    const productId = proid;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ productId, quantity: 1 });
    }

    await user.save();
    return res.status(200).json({ message: "Cart updated", cart: user.cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Error updating cart" });
  }
});

router.get("/cart/:userId", authenticateToken, async (req, res) => {
  
  const { userId } = req.params;
  console.log("Hello : "+userId);

  try {
    const user = await User.findById(userId).populate("cart.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      cartItems: user.cart,
      message: "Cart items retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Error fetching cart items" });
  }
});

module.exports = router;
