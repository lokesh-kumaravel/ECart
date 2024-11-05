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
      const proid = productId._id
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/cart/add",
        { userId, 
          proid, 
          quantity },
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

  const removeItem = (itemId) => {
    return dispatch({ type: "REMOVE_FROM_CART", payload: { itemId } });
  };

  const incrementItem = (itemId) => {
    return dispatch({ type: "INCREMENT_ITEM", payload: { itemId } });
  };

  const decrementItem = (itemId) => {
    return dispatch({ type: "DECREMENT_ITEM", payload: { itemId } });
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
