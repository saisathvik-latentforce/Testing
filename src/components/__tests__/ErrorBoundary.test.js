import React from 'react';
import PropTypes from 'prop-types';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';

import { lightTheme } from '../../assets/theme';
import ErrorBoundary from '../ErrorBoundary';

const ThrowError = ({ shouldThrow }) => {
  if (shouldThrow) throw new Error('Test error');
  return <div>No error</div>;
};
ThrowError.propTypes = { shouldThrow: PropTypes.bool };
ThrowError.defaultProps = { shouldThrow: false };

const originalConsoleError = console.error; // eslint-disable-line no-console
beforeAll(() => {
  console.error = jest.fn();
}); // eslint-disable-line no-console
afterAll(() => {
  console.error = originalConsoleError;
}); // eslint-disable-line no-console

const wrap = ui => render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('ErrorBoundary', () => {
  test('renders children when no error', () => {
    wrap(
      <ErrorBoundary>
        <div data-testid="child">Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('renders fallback UI when child throws', () => {
    wrap(
      <ErrorBoundary>
        <ThrowError shouldThrow />
      </ErrorBoundary>
    );
    expect(screen.getByText(/oops! something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument();
  });

  test('Go Home button sets window.location.href', () => {
    const assignSpy = jest.spyOn(window, 'location', 'get').mockReturnValue({ href: '' });
    let capturedHref = '';
    Object.defineProperty(window, 'location', {
      configurable: true,
      get: () => ({
        get href() {
          return capturedHref;
        },
        set href(val) {
          capturedHref = val;
        },
      }),
    });

    wrap(
      <ErrorBoundary>
        <ThrowError shouldThrow />
      </ErrorBoundary>
    );
    fireEvent.click(screen.getByRole('button', { name: /go home/i }));
    expect(capturedHref).toBe('/');

    assignSpy.mockRestore();
  });
});
