import React, { createContext, useReducer, useContext, useEffect } from "react";
import cartReducer from "./cartReducer";
import commonContext from "../common/commonContext";
import axios from "axios";

const cartContext = createContext();

const initialState = {
  cartItems: [],
};

const CartProvider = ({ children }) => {
  const { user } = useContext(commonContext);
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const fetchCartItems = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchedCartItems = response.data.cartItems;
      console.log(fetchedCartItems);
      dispatch({ type: "SET_CART_ITEMS", payload: fetchedCartItems });
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCartItems(user.user._id);
    }
  }, [user]);

  const addItemToCart = async (userId, productId, quantity) => {
    try {
      const proid = productId._id;
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/cart/add",
        { userId, proid, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCartItems(userId);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const addItem = (productId, quantity = 1) => {
    if (user) {
      addItemToCart(user.user._id, productId, quantity);
      const existingItem = state.cartItems.find(
        (item) => item.id === productId
      );
      if (existingItem) {
        return dispatch({
          type: "INCREMENT_ITEM",
          payload: { itemId: productId },
        });
      } else {
        return dispatch({
          type: "ADD_TO_CART",
          payload: { item: { id: productId, quantity } },
        });
      }
    } else {
      console.error("User is not logged in");
    }
  };
  const removeItemFromDB = async (itemId) => {
    const response = await fetch(
      `http://localhost:3000/api/cart/remove/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
          userId: user.user._id,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove item from the cart");
    }
  };

  const removeItem = async (itemId) => {
    try {
      await removeItemFromDB(itemId);
      window.location.reload();
      return dispatch({ type: "REMOVE_FROM_CART", payload: { itemId } });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const incrementItem = async (itemId, currentQuantity) => {
    console.log("Currt  " + currentQuantity);
    const newQuantity = currentQuantity + 1;
    try {
      await updateItemQuantityInDB(itemId, newQuantity);
      dispatch({ type: "INCREMENT_ITEM", payload: { itemId, newQuantity } });
    } catch (error) {
      console.error("Error updating item in DB:", error);
    }
  };

  const decrementItem = async (itemId, currentQuantity) => {
    if (currentQuantity - 1 == 0) {
      removeItem(itemId);
    }
    const newQuantity = currentQuantity - 1;
    try {
      await updateItemQuantityInDB(itemId, newQuantity);
      dispatch({ type: "DECREMENT_ITEM", payload: { itemId, newQuantity } });
    } catch (error) {
      console.error("Error updating item in DB:", error);
    }
  };

  const updateItemQuantityInDB = async (itemId, newQuantity) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/cart/update/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId: itemId,
            userId: user.user._id,
            quantity: newQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update quantity in DB");
      }

      return await response.json();
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };

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
