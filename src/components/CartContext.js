import React, { createContext, useState, useContext, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useNotification } from '../context/NotificationContext';

const CartContext = createContext();

const CART_STORAGE_KEY = 'cuppacart_cart';

export const CartProvider = ({ children }) => {
  const { showSuccess, showWarning, showInfo } = useNotification();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback(
    product => {
      setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          showSuccess(`${product.title} quantity updated`);
          return prev.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        showSuccess(`${product.title} added to cart`);
        return [...prev, { ...product, quantity: 1 }];
      });
    },
    [showSuccess]
  );

  const removeFromCart = useCallback(
    id => {
      setCart(prev => {
        const item = prev.find(i => i.id === id);
        if (item) {
          const snapshot = prev;
          showWarning(`${item.title} removed`, () => {
            setCart(snapshot);
          });
        }
        return prev.filter(i => i.id !== id);
      });
    },
    [showWarning]
  );

  const updateQuantity = useCallback(
    (id, newQty) => {
      if (newQty <= 0) {
        removeFromCart(id);
        return;
      }
      setCart(prev => prev.map(item => (item.id === id ? { ...item, quantity: newQty } : item)));
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    showInfo('Cart cleared');
  }, [showInfo]);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, total, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);
