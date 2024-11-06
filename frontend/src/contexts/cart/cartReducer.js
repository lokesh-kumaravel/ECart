const initialState = {
  cartItems: [],  
};

const cartReducer = (state = initialState, action) => {
  let updatedCartItems;

  switch (action.type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
      };
    
    case "ADD_TO_CART":
      const newItemId = action.payload.item.id;
      const itemExist = state.cartItems.some((item) => item.id === newItemId);

      if (itemExist) {
        updatedCartItems = state.cartItems.map((item) => {
          if (item.id === newItemId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        updatedCartItems = [...state.cartItems, action.payload.item];
      }

      return { ...state, cartItems: updatedCartItems };

    case "REMOVE_FROM_CART":
      updatedCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.itemId
      );
      console.log("Updated Cart Items:", updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case "INCREMENT_ITEM": {
      const { itemId } = action.payload;
      updatedCartItems = state.cartItems.map((item) =>
        item.productId._id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, cartItems: updatedCartItems };
    }

    case "DECREMENT_ITEM": {
      const { itemId } = action.payload;
      updatedCartItems = state.cartItems.map((item) =>
        item.productId._id === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return { ...state, cartItems: updatedCartItems };
    }

    default:
      return state;
  }
};

export default cartReducer;
