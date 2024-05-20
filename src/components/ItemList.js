import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import * as ItemService from '../services/ItemService';
import './ItemList.css'; 

function ItemList() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]); // Initialize cart state
  const navigate = useNavigate(); 

  useEffect(() => {
    async function fetchItems() {
      const data = await ItemService.getAll();
      setItems(data);
    }
    fetchItems();
  }, []);

  useEffect(() => {
    // Retrieve cart data from localStorage
    const cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartFromStorage);
  }, []);

  const addToCart = (item) => {
    // Ensure that cart is an array before using array methods
    if (!Array.isArray(cart)) {
      console.error('Cart data is not an array:', cart);
      return;
    }

    const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
    if (existingItem) {
      // If the item is already in the cart, update its quantity
      const updatedCart = cart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCart(updatedCart); // Update cart state
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart); // Update cart state
    }
  
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    navigate('/cart'); // Redirect to cart page
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Technology Items for Rent</h1>
      <div className="row">
        {items.map(item => (
          <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
            <div className="card h-100">
              <img src={item.image} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text"><strong>${item.price}</strong> per day</p>
                <p className="card-text">Remaining Stock: {item.quantity}</p> 
                <button onClick={() => addToCart(item)} className="btn btn-primary mr-2">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;
