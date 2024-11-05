import React, { useContext, useState } from 'react';
import cartContext from '../contexts/cart/cartContext';
import { useNavigate } from 'react-router-dom';

// OrderSummary Component to display cart items and calculate total price
const OrderSummary = ({ cartItems }) => {
    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + item.finalPrice * item.quantity, 0);
    };

    return (
        <div>
            <h2>Order Summary</h2>
            {cartItems.map(item => (
                <div key={item.id}>
                    <span>{item.title} - {item.quantity} x ${item.finalPrice}</span>
                </div>
            ))}
            <h3>Total: ${calculateTotal(cartItems)}</h3>
        </div>
    );
};
export default OrderSummary;