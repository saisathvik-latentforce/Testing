import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddCoffeeDialog from '../AddCoffeeDialog';

// Mock MUI theme
jest.mock('../assets/theme', () => ({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
}));

describe('AddCoffeeDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderDialog = (props = {}) => {
    return render(
      <AddCoffeeDialog
        open={true}
        onClose={mockOnClose}
        onAdd={mockOnAdd}
        {...props}
      />
    );
  };

  test('renders dialog when open is true', () => {
    renderDialog();
    expect(screen.getByText('Add New Coffee')).toBeInTheDocument();
  });

  test('does not render when open is false', () => {
    renderDialog({ open: false });
    expect(screen.queryByText('Add New Coffee')).not.toBeInTheDocument();
  });

  test('calls onClose when cancel button is clicked', () => {
    renderDialog();
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('add button is disabled when title and price are empty', () => {
    renderDialog();
    const addButton = screen.getByText('Add');
    expect(addButton).toBeDisabled();
  });

  test('add button is enabled when title and price are filled', async () => {
    renderDialog();

    const titleInput = screen.getByLabelText('Title');
    const priceInput = screen.getByLabelText('Price');

    await userEvent.type(titleInput, 'Test Coffee');
    await userEvent.type(priceInput, '5.99');

    const addButton = screen.getByText('Add');
    expect(addButton).not.toBeDisabled();
  });

  test('calls onAdd with correct data when form is submitted', async () => {
    renderDialog();

    const titleInput = screen.getByLabelText('Title');
    const priceInput = screen.getByLabelText('Price');
    const descriptionInput = screen.getByLabelText('Description');

    await userEvent.type(titleInput, 'Test Coffee');
    await userEvent.type(priceInput, '5.99');
    await userEvent.type(descriptionInput, 'A delicious test coffee');

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Coffee',
          price: 5.99,
          description: 'A delicious test coffee',
          itemsSold: 0,
        })
      );
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('generates unique id for each coffee', async () => {
    renderDialog();

    const titleInput = screen.getByLabelText('Title');
    const priceInput = screen.getByLabelText('Price');

    await userEvent.type(titleInput, 'Test Coffee');
    await userEvent.type(priceInput, '5.99');

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    await waitFor(() => {
      const call = mockOnAdd.mock.calls[0][0];
      expect(call.id).toBeDefined();
      expect(typeof call.id).toBe('string');
      expect(call.id.length).toBeGreaterThan(0);
    });
  });

  test('resets form after successful submission', async () => {
    renderDialog();

    const titleInput = screen.getByLabelText('Title');
    const priceInput = screen.getByLabelText('Price');

    await userEvent.type(titleInput, 'Test Coffee');
    await userEvent.type(priceInput, '5.99');

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(titleInput).toHaveValue('');
      expect(priceInput).toHaveValue('');
    });
  });
});
