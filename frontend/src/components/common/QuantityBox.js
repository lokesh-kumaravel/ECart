import React, { useContext } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import cartContext from "../../contexts/cart/cartContext";

const QuantityBox = (props) => {
  const { itemId, itemQuantity } = props;
  const { incrementItem, decrementItem } = useContext(cartContext);
  // console.log("In box quantity : "+itemId)
  return (
    <div className="quantity_box">
      <button type="button" onClick={() => decrementItem(itemId, itemQuantity)}>
        <FaMinus />
      </button>
      <span className="quantity_count">{itemQuantity}</span>
      <button
        type="button"
        onClick={() => incrementItem(itemId, itemQuantity)}
        disabled={itemQuantity >= 5}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default QuantityBox;

// import React, { useContext } from 'react';
// import { FaPlus, FaMinus } from 'react-icons/fa';
// import cartContext from '../../contexts/cart/cartContext';

// const QuantityBox = (props) => {

//     const { itemId, itemQuantity } = props;

//     const { incrementItem, decrementItem } = useContext(cartContext);

//     return (
//         <>
//             <div className="quantity_box">
//                 <button
//                     type="button"
//                     onClick={() => decrementItem(itemId)}
//                 >
//                     <FaMinus />
//                 </button>
//                 <span className="quantity_count">
//                     {itemQuantity}
//                 </span>
//                 <button
//                     type="button"
//                     onClick={() => incrementItem(itemId)}
//                     disabled={itemQuantity >= 5}
//                 >
//                     <FaPlus />
//                 </button>
//             </div>
//         </>
//     );
// };

// export default QuantityBox;
