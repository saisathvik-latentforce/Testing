import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { CartProvider, useCart } from '../CartContext';
import { NotificationProvider } from '../../context/NotificationContext';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const TestComponent = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  return (
    <div>
      <div data-testid="cart-count">{cart.length}</div>
      <div data-testid="cart-total">{total.toFixed(2)}</div>
      <button
        data-testid="add-item"
        onClick={() => addToCart({ id: 1, title: 'Test Coffee', price: 5.99 })}
      >
        Add
      </button>
      <button data-testid="remove-item" onClick={() => removeFromCart(1)}>
        Remove
      </button>
      <button data-testid="update-quantity" onClick={() => updateQuantity(1, 3)}>
        Update
      </button>
      <button data-testid="clear-cart" onClick={() => clearCart()}>
        Clear
      </button>
    </div>
  );
};

const renderWithProviders = ui =>
  render(
    <NotificationProvider>
      <CartProvider>{ui}</CartProvider>
    </NotificationProvider>
  );

describe('CartContext', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test('provides initial empty cart', () => {
    renderWithProviders(<TestComponent />);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0.00');
  });

  test('adds item to cart', () => {
    renderWithProviders(<TestComponent />);
    fireEvent.click(screen.getByTestId('add-item'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
  });

  test('removes item from cart', () => {
    renderWithProviders(<TestComponent />);
    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('remove-item'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });

  test('clears cart', () => {
    renderWithProviders(<TestComponent />);
    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('clear-cart'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });

  test('calculates total correctly', () => {
    renderWithProviders(<TestComponent />);
    fireEvent.click(screen.getByTestId('add-item'));
    expect(screen.getByTestId('cart-total')).toHaveTextContent('5.99');
  });

  test('loads cart from localStorage on mount', () => {
    const savedCart = JSON.stringify([{ id: 1, title: 'Saved Coffee', price: 4.99, quantity: 2 }]);
    localStorageMock.getItem.mockReturnValue(savedCart);
    renderWithProviders(<TestComponent />);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('9.98');
  });

  test('saves cart to localStorage when updated', () => {
    renderWithProviders(<TestComponent />);
    fireEvent.click(screen.getByTestId('add-item'));
    expect(localStorageMock.setItem).toHaveBeenCalledWith('cuppacart_cart', expect.any(String));
  });
});
