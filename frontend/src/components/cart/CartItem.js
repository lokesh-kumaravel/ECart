import React, { useContext } from "react";
import { TbTrash } from "react-icons/tb";
import { Link } from "react-router-dom";
import { displayMoney } from "../../helpers/utils";
import cartContext from "../../contexts/cart/cartContext";
import QuantityBox from "../common/QuantityBox";

const CartItem = (props) => {
  const { _id, images, title, originalPrice, finalPrice, quantity, path } =
    props;
  const { removeItem, updateItemQuantity } = useContext(cartContext);

  const newPrice = displayMoney(finalPrice);
  const oldPrice = displayMoney(originalPrice);

  return (
    <div className="cart_item">
      <figure className="cart_item_img">
        <Link to={`${path}${_id}`}>
          <img src={images} alt="product-img" />
        </Link>
      </figure>
      <div className="cart_item_info">
        <div className="cart_item_head">
          <h4 className="cart_item_title">
            <Link to={`/product-details/${_id}`}>{title}</Link>
          </h4>
          <div className="cart_item_del">
            <span onClick={() => removeItem(_id)}>
              <TbTrash />
            </span>
            <div className="tooltip">Remove Item</div>
          </div>
        </div>

        <h2 className="cart_item_price">
          {newPrice} &nbsp;
          <small>
            <del>{oldPrice}</del>
          </small>
        </h2>

        <QuantityBox
          itemId={_id}
          itemQuantity={quantity}
          updateQuantity={updateItemQuantity}
        />
      </div>
    </div>
  );
};

export default CartItem;
