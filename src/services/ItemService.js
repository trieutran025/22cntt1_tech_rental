const BASE_URL = "http://localhost:8080/items";
const ORDER_URL = "http://localhost:8080/orders";
const CART_URL = "http://localhost:8080/cart";

export const getAll = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

export const getById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  const data = await response.json();
  return data;
};

export const create = async (item) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  const data = await response.json();
  return data;
};

export const update = async (id, updatedItem) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedItem),
  });

  if (!response.ok) {
    throw new Error('Failed to update item');
  }

  const data = await response.json();
  return data;
};

export const placeOrder = async (cart) => {
  try {
    const response = await fetch(ORDER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    });

    if (!response.ok) {
      throw new Error('Failed to place order');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

// Define the saveCart function in a component where cart, setCart, and navigate are accessible
export const saveCart = async (cart) => {
  try {
    const response = await fetch(CART_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    });

    if (!response.ok) {
      throw new Error('Failed to save cart to server');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving cart to server:', error);
    throw error;
  }
};



export const getCart = async () => {
  try {
    const response = await fetch(CART_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting cart from server:', error);
    throw error;
  }
};
