import React from 'react';
import '@fontsource/roboto';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Coffee from './components/Coffee';
import Order from './components/Order';
import CoffeeStats from './components/CoffeeStats';
import Payment from './components/Payment';
import PaymentSuccess from './components/PaymentSuccess';
import { CartProvider } from './components/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeContext, ThemeContextProvider } from './context/ThemeContext';

const ThemedApp = () => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Coffee />
              </>
            }
          />
          <Route path="/orders" element={<Order />} />
          <Route path="/stats" element={<CoffeeStats />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeContextProvider>
        <NotificationProvider>
          <CartProvider>
            <Router>
              <ThemedApp />
            </Router>
          </CartProvider>
        </NotificationProvider>
      </ThemeContextProvider>
    </ErrorBoundary>
  );
};

export default App;
