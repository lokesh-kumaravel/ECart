const Cart = require('../model/Cart'); // Import the Cart model

// Add item to cart
const addItemToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        console.log(userId)
        console.log(productId)
        console.log(quantity)
        // Find or create the cart for the user
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if item already exists in the cart
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            // Update quantity if the item already exists
            existingItem.quantity += quantity;
        } else {
            // Add new item to the cart
            cart.items.push({ productId, quantity });
        }

        await cart.save(); // Save the cart
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error adding item to cart", error });
    }
};

// Other cart operations like removeItemFromCart, updateItemQuantity, etc. can be implemented similarly...

module.exports = {
    addItemToCart,
    // Export other functions as needed...
};
