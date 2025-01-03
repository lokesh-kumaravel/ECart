const express = require("express");
const router = express.Router();
const User = require("../model/User");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/cart/add", authenticateToken, async (req, res) => {
  try {
    const { proid } = req.body;
    const userId = req.user.id;

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

router.patch("/cart/update/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const { quantity, userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItem = user.cart.find(
      (item) => item.productId.toString() === itemId
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;

    await user.save();

    res.status(200).json(cartItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.delete("/cart/remove/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const { userId } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: { productId: itemId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser.cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
