import React, { createContext, useReducer, useContext } from "react";
import cartReducer from "./cartReducer";
import commonContext from "../common/commonContext";
import axios from "axios";

// Cart-Context
const cartContext = createContext();

// Initial State
const initialState = {
  cartItems: [],
};

// Cart-Provider Component
const CartProvider = ({ children }) => {
  const { user } = useContext(commonContext); // Move this inside the component
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Function to add item to cart
  const addItemToCart = async (userId, productId, quantity) => {
    console.log("Hereeeh : "+userId);
    
    try {
      // Retrieve the JWT token, for example from localStorage or context
      const token = localStorage.getItem("token"); // Adjust this if your token is stored elsewhere

      const response = await axios.post(
        "http://localhost:3000/api/cart/add",
        {
          userId,
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        }
      );

      console.log("Item added to cart:", response.data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Dispatched Actions
  const addItem = (productId, quantity) => {
    if (user) {
      // Check if user is available
      console.log(user.user._id);
      addItemToCart(user.user._id, productId, quantity); // Call the function to add item
    } else {
      console.error("User is not logged in");
    }

    // Constructing the item object to include id and quantity
    const itemToAdd = { id: productId, quantity }; // You may also want to include other product details if necessary

    return dispatch({
      type: "ADD_TO_CART",
      payload: { item: itemToAdd }, // Corrected payload structure
    });
  };

  const removeItem = (itemId) => {
    return dispatch({
      type: "REMOVE_FROM_CART",
      payload: { itemId },
    });
  };

  const incrementItem = (itemId) => {
    return dispatch({
      type: "INCREMENT_ITEM",
      payload: { itemId },
    });
  };

  const decrementItem = (itemId) => {
    return dispatch({
      type: "DECREMENT_ITEM",
      payload: { itemId },
    });
  };

  // Context values
  const values = {
    ...state,
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
  };

  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default cartContext;
export { CartProvider };
