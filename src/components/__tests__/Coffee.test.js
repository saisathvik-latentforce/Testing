import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';

import { lightTheme } from '../../assets/theme';
import { CartProvider } from '../CartContext';
import { NotificationProvider } from '../../context/NotificationContext';
import Coffee from '../Coffee';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const renderCoffee = () =>
  render(
    <ThemeProvider theme={lightTheme}>
      <NotificationProvider>
        <CartProvider>
          <Coffee />
        </CartProvider>
      </NotificationProvider>
    </ThemeProvider>
  );

describe('Coffee', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null);
  });

  test('renders vendor chip on each product card', async () => {
    renderCoffee();
    await waitFor(() => expect(screen.getByText('Espresso Coffee')).toBeInTheDocument());
    expect(screen.getAllByText('Blue Bottle').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Stumptown Roasters').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Counter Culture Coffee').length).toBeGreaterThan(0);
  });

  test('shows all products when no vendor filter is selected', async () => {
    renderCoffee();
    await waitFor(() => expect(screen.getByText('Espresso Coffee')).toBeInTheDocument());
    expect(screen.getByText('Cold Brew')).toBeInTheDocument();
    expect(screen.getByText('Ethiopian Yirgacheffe')).toBeInTheDocument();
  });

  test('filters to a single vendor when its chip is clicked', async () => {
    renderCoffee();
    await waitFor(() => expect(screen.getByText('Espresso Coffee')).toBeInTheDocument());

    fireEvent.click(screen.getAllByText('Blue Bottle')[0]);

    expect(screen.getByText('Espresso Coffee')).toBeInTheDocument();
    expect(screen.getByText('Latte')).toBeInTheDocument();
    expect(screen.queryByText('Cold Brew')).not.toBeInTheDocument();
    expect(screen.queryByText('Ethiopian Yirgacheffe')).not.toBeInTheDocument();
  });

  test('filters to the union of multiple selected vendors', async () => {
    renderCoffee();
    await waitFor(() => expect(screen.getByText('Espresso Coffee')).toBeInTheDocument());

    fireEvent.click(screen.getAllByText('Blue Bottle')[0]);
    fireEvent.click(screen.getAllByText('Stumptown Roasters')[0]);

    expect(screen.getByText('Espresso Coffee')).toBeInTheDocument();
    expect(screen.getByText('Cold Brew')).toBeInTheDocument();
    expect(screen.queryByText('Ethiopian Yirgacheffe')).not.toBeInTheDocument();
  });

  test('clearing the filter (toggling off) shows all products again', async () => {
    renderCoffee();
    await waitFor(() => expect(screen.getByText('Espresso Coffee')).toBeInTheDocument());

    const blueBottleChip = screen.getAllByText('Blue Bottle')[0];
    fireEvent.click(blueBottleChip);
    expect(screen.queryByText('Cold Brew')).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByText('Blue Bottle')[0]);
    expect(screen.getByText('Cold Brew')).toBeInTheDocument();
  });
});
