import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []); // Get cart from local storage

  const handleCheckout = () => {
    alert('Checkout is not implemented yet');
  };

  const addToCart = (item) => {
    // Ensure that cart is an array before using array methods
    if (!Array.isArray(cart)) {
      console.error('Cart data is not an array:', cart);
      return;
    }

    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      // If the item is already in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity++;
      setCart(updatedCart);
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div>
          <ul className="list-group mb-4">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p>${item.price} x {item.quantity}</p>
                </div>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-right">Total: ${total}</h3>
          <div className="text-center">
            <button onClick={handleCheckout} className="btn btn-success">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
