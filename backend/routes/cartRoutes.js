const express = require("express");
const router = express.Router();
const Cart = require("../model/Cart"); // Import the Cart model
const authenticateToken = require("../middleware/authenticateToken"); // Adjust the path accordingly

// Add an item to the cart
router.post("/cart/add", authenticateToken, async (req, res) => {
  try {
    const { productId } = req.body; // Get productId from the request body
    const userId = req.user.id; // Get userId from the token
    console.log("User ID:", userId); // For debugging

    // Find the cart for the user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If the cart does not exist, create a new cart with the product
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1 }], // Set default quantity to 1
      });
      await cart.save();
      return res
        .status(201)
        .json({ message: "Cart created and item added", cart });
    } else {
      // If the cart exists, check if the product is already in the cart
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      console.log("This is Existing Items");
      if (existingItem) {
        // If the item exists, increase the quantity by one
        existingItem.quantity += 1; // Increment the quantity
        console.log(`Updated quantity: ${existingItem.quantity}`);

        try {
          const updatedCart = await cart.save(); // Save the updated cart
          console.log(`Cart saved successfully: ${updatedCart}`);
          return res.json({
            message: "Item quantity updated",
            cart: updatedCart,
          });
        } catch (saveError) {
          console.error("Error saving the cart:", saveError);
          return res.status(500).json({ message: "Error saving the cart" });
        }
      } else {
        // If the item does not exist, add it to the cart with quantity 1
        cart.items.push({ productId, quantity: 1 }); // Default quantity to 1 for new items
        await cart.save(); // Save the updated cart
        return res.json({ message: "Item added to cart", cart });
      }
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
