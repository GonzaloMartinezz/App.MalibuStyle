import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, size) => {
    const existing = cartItems.find(item => item.id === product.id && item.size === size);
    if(existing) {
      setCartItems(cartItems.map(item => item.id === product.id && item.size === size ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...product, size, qty: 1 }]);
    }
  };

  const removeFromCart = (id, size) => {
    setCartItems(cartItems.filter(item => !(item.id === id && item.size === size)));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

