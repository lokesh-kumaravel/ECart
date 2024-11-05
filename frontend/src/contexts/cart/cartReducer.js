const initialState = {
  cartItems: [], // Set cartItems as an empty array initially
  // You can add other initial states here if needed, like loading, error, etc.
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "ADD_TO_CART":
      const newItemId = action.payload.item.id;
      const itemExist = state.cartItems.some((item) => item.id === newItemId);

      let updatedCartItems = null;

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
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.itemId
        ),
      };

    case "INCREMENT_ITEM": {
      const { itemId } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productId._id === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case "DECREMENT_ITEM": {
      const { itemId } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productId._id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }

    default:
      return state;
  }
};

export default cartReducer;

// const cartReducer = (state, action) => {
//     switch (action.type) {

//         case 'ADD_TO_CART':
//             const newItemId = action.payload.item.id;
//             const itemExist = state.cartItems.some(item => item.id === newItemId);

//             let updatedCartItems = null;

//             if (itemExist) {
//                 updatedCartItems = state.cartItems.map(item => {
//                     if (item.id === newItemId) {
//                         return {
//                             ...item,
//                             quantity: item.quantity + 1
//                         };
//                     }
//                     return item;
//                 });
//             } else {
//                 updatedCartItems = [...state.cartItems, action.payload.item];
//             }

//             return {
//                 ...state,
//                 cartItems: updatedCartItems
//             };


//         case 'REMOVE_FROM_CART':
//             return {
//                 ...state,
//                 cartItems: state.cartItems.filter(item => item.id !== action.payload.itemId)
//             };


//         case 'INCREMENT_ITEM':
//             return {
//                 ...state,
//                 cartItems: state.cartItems.map(item => {
//                     if (item.id === action.payload.itemId) {
//                         return {
//                             ...item,
//                             quantity: item.quantity + 1
//                         };
//                     }
//                     return item;
//                 })
//             };


//         case 'DECREMENT_ITEM':
//             return {
//                 ...state,
//                 cartItems: state.cartItems.map(item => {
//                     if (item.id === action.payload.itemId) {
//                         return {
//                             ...item,
//                             quantity: item.quantity - 1
//                         };
//                     }
//                     return item;
//                 }).filter(item => item.quantity !== 0)
//             };


//         default:
//             return state;
//     }
// };

// export default cartReducer;