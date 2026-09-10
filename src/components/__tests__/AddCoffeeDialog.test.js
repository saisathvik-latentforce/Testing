import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';

import { lightTheme } from '../../assets/theme';
import AddCoffeeDialog from '../AddCoffeeDialog';

const renderDialog = (props = {}) =>
  render(
    <ThemeProvider theme={lightTheme}>
      <AddCoffeeDialog open={true} onClose={jest.fn()} onAdd={jest.fn()} {...props} />
    </ThemeProvider>
  );

describe('AddCoffeeDialog', () => {
  test('renders dialog when open', () => {
    renderDialog();
    expect(screen.getByText('Add New Coffee')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    renderDialog({ open: false });
    expect(screen.queryByText('Add New Coffee')).not.toBeInTheDocument();
  });

  test('calls onClose when cancel is clicked', () => {
    const onClose = jest.fn();
    renderDialog({ onClose });
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('Add Coffee button is disabled when title and price are empty', () => {
    renderDialog();
    expect(screen.getByRole('button', { name: /add coffee/i })).toBeDisabled();
  });

  test('Add Coffee button stays disabled without a vendor', async () => {
    renderDialog();
    await userEvent.type(screen.getByLabelText(/title/i), 'Test Coffee');
    await userEvent.type(screen.getByLabelText(/price/i), '5.99');
    expect(screen.getByRole('button', { name: /add coffee/i })).toBeDisabled();
  });

  test('Add Coffee button is enabled when title, price, and vendor are filled', async () => {
    renderDialog();
    await userEvent.type(screen.getByLabelText(/title/i), 'Test Coffee');
    await userEvent.type(screen.getByLabelText(/price/i), '5.99');
    await userEvent.type(screen.getByLabelText(/vendor/i), 'Blue Bottle');
    expect(screen.getByRole('button', { name: /add coffee/i })).not.toBeDisabled();
  });

  test('calls onAdd with correct data, including vendor, on submit', async () => {
    const onAdd = jest.fn();
    const onClose = jest.fn();
    renderDialog({ onAdd, onClose });

    await userEvent.type(screen.getByLabelText(/title/i), 'Test Coffee');
    await userEvent.type(screen.getByLabelText(/price/i), '5.99');
    await userEvent.type(screen.getByLabelText(/description/i), 'Tasty');
    await userEvent.type(screen.getByLabelText(/vendor/i), 'Blue Bottle');

    fireEvent.click(screen.getByRole('button', { name: /add coffee/i }));

    await waitFor(() =>
      expect(onAdd).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Coffee',
          price: 5.99,
          description: 'Tasty',
          itemsSold: 0,
          vendor: 'Blue Bottle',
        })
      )
    );
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });

  test('offers existing vendors as selectable options', async () => {
    renderDialog({ vendors: ['Blue Bottle', 'Stumptown Roasters'] });
    const vendorInput = screen.getByLabelText(/vendor/i);
    await userEvent.click(vendorInput);
    expect(screen.getByText('Blue Bottle')).toBeInTheDocument();
    expect(screen.getByText('Stumptown Roasters')).toBeInTheDocument();
  });

  test('generates a unique id for each new coffee', async () => {
    const onAdd = jest.fn();
    renderDialog({ onAdd });
    await userEvent.type(screen.getByLabelText(/title/i), 'Latte');
    await userEvent.type(screen.getByLabelText(/price/i), '6');
    await userEvent.type(screen.getByLabelText(/vendor/i), 'Blue Bottle');
    fireEvent.click(screen.getByRole('button', { name: /add coffee/i }));
    await waitFor(() => expect(onAdd).toHaveBeenCalled());
    const { id } = onAdd.mock.calls[0][0];
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  test('resets form after submit', async () => {
    renderDialog();
    const titleInput = screen.getByLabelText(/title/i);
    const vendorInput = screen.getByLabelText(/vendor/i);
    await userEvent.type(titleInput, 'Espresso');
    await userEvent.type(screen.getByLabelText(/price/i), '4');
    await userEvent.type(vendorInput, 'Blue Bottle');
    fireEvent.click(screen.getByRole('button', { name: /add coffee/i }));
    await waitFor(() => expect(titleInput).toHaveValue(''));
    expect(vendorInput).toHaveValue('');
  });
});
