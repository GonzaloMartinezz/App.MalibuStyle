import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('nivis_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('nivis_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      // Match by both id AND size for unique cart entries
      const cartKey = `${product.id}-${product.size || 'default'}`;
      const existing = prev.find((item) => `${item.id}-${item.size || 'default'}` === cartKey);
      if (existing) {
        return prev.map((item) =>
          `${item.id}-${item.size || 'default'}` === cartKey
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && (item.size || 'default') === (size || 'default'))));
  };

  const updateQuantity = (id, amount, size) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && (item.size || 'default') === (size || 'default')) {
          const newQty = Math.max(1, item.quantity + amount);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
