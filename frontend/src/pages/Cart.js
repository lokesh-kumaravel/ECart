import React, { useContext, useEffect } from "react";
import { BsCartX } from "react-icons/bs";
import { calculateTotal, displayMoney } from "../helpers/utils";
import useDocTitle from "../hooks/useDocTitle";
import cartContext from "../contexts/cart/cartContext";
import CartItem from "../components/cart/CartItem";
import EmptyView from "../components/common/EmptyView";
import commonContext from "../contexts/common/commonContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  useDocTitle("Cart");

  const navigate = useNavigate();

  const { cartItems, setCartItems } = useContext(cartContext);
  const { user } = useContext(commonContext);

  const cartQuantity = cartItems.length;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchCartItems = async () => {
      const userId = user;
      const response = await fetch(`http://localhost:3000/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCartItems(data);
    };

    fetchCartItems();
  }, []);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const cartTotal = cartItems.map((item) => {
    const { productId, quantity } = item;
    return (productId.originalPrice || 0) * quantity;
  });

  const calculateCartTotal = calculateTotal(cartTotal);
  const displayCartTotal = displayMoney(calculateCartTotal);

  const cartDiscount = cartItems.map((item) => {
    const { productId, quantity } = item;
    return (productId.originalPrice - productId.finalPrice || 0) * quantity;
  });

  const calculateCartDiscount = calculateTotal(cartDiscount);
  const displayCartDiscount = displayMoney(calculateCartDiscount);

  // Final total amount
  const totalAmount = calculateCartTotal - calculateCartDiscount;
  const displayTotalAmount = displayMoney(totalAmount);

  return (
    <>
      {console.log("ITEMSJK : " + cartItems)}
      <section id="cart" className="section">
        <div className="container">
          {cartQuantity === 0 ? (
            <EmptyView
              icon={<BsCartX />}
              msg="Your Cart is Empty"
              link="/all-products"
              btnText="Start Shopping"
            />
          ) : (
            <div className="wrapper cart_wrapper">
              <div className="cart_left_col">
                {cartItems.map((item, index) => {
                  const { productId, quantity } = item;

                  console.log(`Item ${index}:`, item);

                  return (
                    <CartItem
                      key={item._id}
                      _id={productId._id}
                      title={productId.title}
                      images={[productId.images[0]]}
                      finalPrice={productId.finalPrice}
                      originalPrice={productId.originalPrice}
                      quantity={quantity}
                      path={productId.path || ""}
                    />
                  );
                })}
              </div>

              <div className="cart_right_col">
                <div className="order_summary">
                  <h3>
                    Order Summary &nbsp; ( {cartQuantity}{" "}
                    {cartQuantity > 1 ? "items" : "item"} )
                  </h3>
                  <div className="order_summary_details">
                    <div className="price">
                      <span>Original Price</span>
                      <b>{displayCartTotal}</b>
                    </div>
                    <div className="discount">
                      <span>Discount</span>
                      <b>- {displayCartDiscount}</b>
                    </div>
                    <div className="delivery">
                      <span>Delivery</span>
                      <b>Free</b>
                    </div>
                    <div className="separator"></div>
                    <div className="total_price">
                      <b>
                        <small>Total Price</small>
                      </b>
                      <b>{displayTotalAmount}</b>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn checkout_btn"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;

// import React, { useContext, useEffect } from "react";
// import { BsCartX } from "react-icons/bs";
// import { calculateTotal, displayMoney } from "../helpers/utils";
// import useDocTitle from "../hooks/useDocTitle";
// import cartContext from "../contexts/cart/cartContext";
// import CartItem from "../components/cart/CartItem";
// import EmptyView from "../components/common/EmptyView";
// import commonContext from "../contexts/common/commonContext";

// const Cart = () => {
//   useDocTitle("Cart");

//   const { cartItems,setCartItems } = useContext(cartContext);
//   const { user } = useContext(commonContext);

//   const cartQuantity = cartItems.length;

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       const userId = user;
//       const response = await fetch(`http://localhost:3000/api/cart/${userId}`); // Adjust the endpoint as needed
//       const data = await response.json();
//       setCartItems(data); // Set the cart items in context
//     };

//     fetchCartItems();
//   }, []);

//   // total original price
// // Total original price
// const cartTotal = cartItems.map((item) => {
//   const { productId, quantity } = item;
//   return (productId.originalPrice || 0) * quantity; // default to 0 if originalPrice is undefined
// });

// const calculateCartTotal = calculateTotal(cartTotal);
// const displayCartTotal = displayMoney(calculateCartTotal);

// // Total discount
// const cartDiscount = cartItems.map((item) => {
//   const { productId, quantity } = item;
//   return ((productId.originalPrice - productId.finalPrice) || 0) * quantity; // default to 0 if prices are undefined
// });

// const calculateCartDiscount = calculateTotal(cartDiscount);
// const displayCartDiscount = displayMoney(calculateCartDiscount);

// // Final total amount
// const totalAmount = calculateCartTotal - calculateCartDiscount;
// const displayTotalAmount = displayMoney(totalAmount);

//   return (
//     <>
//     {console.log("ITEMSJK : "+cartItems)}
//       <section id="cart" className="section">
//         <div className="container">
//           {cartQuantity === 0 ? (
//             <EmptyView
//               icon={<BsCartX />}
//               msg="Your Cart is Empty"
//               link="/all-products"
//               btnText="Start Shopping"
//             />
//           ) : (
//             <div className="wrapper cart_wrapper">
//               <div className="cart_left_col">
//                 {cartItems.map((item, index) => {
//                   const { productId, quantity } = item;

//                   console.log(`Item ${index}:`, item);

//                   return (
//                     <CartItem
//                       key={item._id}
//                       id={productId._id}
//                       title={productId.title}
//                       images={[productId.images[0]]} // Assuming 'heroImage' is an image URL
//                       finalPrice={productId.finalPrice}
//                       originalPrice={productId.originalPrice}
//                       quantity={quantity}
//                       path={productId.path || ""} // Optional, use empty string if path is missing
//                     />
//                   );
//                 })}

//                 {/* {
//                                         cartItems.map((item,index) => (
//                                             <CartItem
//                                                 key={item.id||index}
//                                                 {...item}
//                                             />
//                                         ))
//                                     } */}
//               </div>

//               <div className="cart_right_col">
//                 <div className="order_summary">
//                   <h3>
//                     Order Summary &nbsp; ( {cartQuantity}{" "}
//                     {cartQuantity > 1 ? "items" : "item"} )
//                   </h3>
//                   <div className="order_summary_details">
//                     <div className="price">
//                       <span>Original Price</span>
//                       <b>{displayCartTotal}</b>
//                     </div>
//                     <div className="discount">
//                       <span>Discount</span>
//                       <b>- {displayCartDiscount}</b>
//                     </div>
//                     <div className="delivery">
//                       <span>Delivery</span>
//                       <b>Free</b>
//                     </div>
//                     <div className="separator"></div>
//                     <div className="total_price">
//                       <b>
//                         <small>Total Price</small>
//                       </b>
//                       <b>{displayTotalAmount}</b>
//                     </div>
//                   </div>
//                   <button type="button" className="btn checkout_btn">
//                     Checkout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default Cart;
