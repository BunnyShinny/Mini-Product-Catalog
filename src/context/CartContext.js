"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    let message = "";

    setCart(prevCart => {
      const index = prevCart.findIndex(item => item.id === product.id);

      if (index !== -1) {
        const updated = [...prevCart];
        updated[index].qty = qty;
        message = `Updated quantity for "${product.title}" to ${qty}`;
        return updated;
      }

      message = `Added "${product.title}" to cart (${qty})`;
      return [...prevCart, { ...product, qty }];
    });

    // Show toast after state update
    toast.success(message);
  };

  const removeFromCart = (id) => {
    const removedItem = cart.find(item => item.id === id);
    setCart(prev => prev.filter(item => item.id !== id));

    if (removedItem) {
      toast.success(`"${removedItem.title}" removed from the cart`);
    }
  };

  // Compute total quantity and total types
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalTypes = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalQty, totalTypes }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart in child components
export function useCart() {
  return useContext(CartContext);
}
