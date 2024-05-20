import React, { useState } from 'react';
import * as ItemService from '../services/ItemService';
import { useNavigate } from 'react-router-dom';

function ItemCreate() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { name, description, price, image };
    await ItemService.create(newItem);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h1>Add New Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">Name:</label>
          <input type="text" className="form-control" id="itemName" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="itemDescription" className="form-label">Description:</label>
          <textarea className="form-control" id="itemDescription" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="itemPrice" className="form-label">Price:</label>
          <input type="number" className="form-control" id="itemPrice" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="itemImage" className="form-label">Image URL:</label>
          <input type="text" className="form-control" id="itemImage" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Add Item</button>
      </form>
    </div>
  );
}

export default ItemCreate;
