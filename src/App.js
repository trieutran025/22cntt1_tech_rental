import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import ItemCreate from './components/ItemCreate';
import Cart from './components/Cart'; // Import Cart component

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Home</Link>
          <Link className="navbar-brand" to="/create">Add Item</Link>
          <Link className="navbar-brand" to="/cart">Cart</Link>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/create" element={<ItemCreate />} />
          <Route path="/cart" element={<Cart />} /> {/* Add Cart route */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
