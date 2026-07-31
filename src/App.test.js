import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('react-router-dom', () => {
  const PropTypes = require('prop-types');

  const BrowserRouter = ({ children }) => <div>{children}</div>;
  BrowserRouter.propTypes = { children: PropTypes.node.isRequired };

  const Routes = ({ children }) => <div>{children}</div>;
  Routes.propTypes = { children: PropTypes.node };
  Routes.defaultProps = { children: null };

  const Route = ({ element }) => element || null;
  Route.propTypes = { element: PropTypes.node };
  Route.defaultProps = { element: null };

  const LinkComp = ({ children, to }) => <a href={to}>{children}</a>;
  LinkComp.displayName = 'Link';
  LinkComp.propTypes = { children: PropTypes.node.isRequired, to: PropTypes.string.isRequired };

  return {
    BrowserRouter,
    Routes,
    Route,
    Outlet: () => null,
    Link: LinkComp,
    useLocation: () => ({ pathname: '/' }),
    useNavigate: () => jest.fn(),
  };
});

jest.mock('./components/Layout', () => {
  const L = () => (
    <div data-testid="layout">
      <div data-testid="hero">Hero</div>
      <div data-testid="coffee">Coffee</div>
    </div>
  );
  L.displayName = 'Layout';
  return L;
});

jest.mock('./components/Hero', () => {
  const H = () => <div data-testid="hero">Hero</div>;
  H.displayName = 'Hero';
  return H;
});
jest.mock('./components/Coffee', () => {
  const C = () => <div data-testid="coffee">Coffee</div>;
  C.displayName = 'Coffee';
  return C;
});
jest.mock('./components/Order', () => {
  const O = () => <div>Order</div>;
  O.displayName = 'Order';
  return O;
});
jest.mock('./components/CoffeeStats', () => {
  const S = () => <div>Stats</div>;
  S.displayName = 'CoffeeStats';
  return S;
});
jest.mock('./components/Payment', () => {
  const P = () => <div>Payment</div>;
  P.displayName = 'Payment';
  return P;
});
jest.mock('./components/PaymentSuccess', () => {
  const PS = () => <div>Success</div>;
  PS.displayName = 'PaymentSuccess';
  return PS;
});

// eslint-disable-next-line import/first
import App from './App';

describe('App', () => {
  test('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  test('renders layout', () => {
    render(<App />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});
