"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty) => {
    setCart(prevCart => {
      const index = prevCart.findIndex(item => item.id === product.id);
      if (index !== -1) {
        const updated = [...prevCart];
        updated[index].qty = qty; // replace old qty
        return updated;
      }
      return [...prevCart, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Compute total quantity from cart
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalTypes = cart.length;
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalQty,totalTypes }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart in child components
export function useCart() {
  return useContext(CartContext);
}
