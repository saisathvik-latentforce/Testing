import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  test('renders the coffee shop application', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Check for the main heading
    const headingElement = screen.getByText(/featured coffees/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});
