import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as ItemService from '../services/ItemService';
import './ItemDetail.css'; // Import custom CSS for additional styling

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function fetchItem() {
      const data = await ItemService.getById(id);
      setItem(data);
    }
    fetchItem();
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={item.image} alt={item.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <p><strong>${item.price}</strong> per day</p>
          <button className="btn btn-primary">Rent Now</button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
