import React from 'react';
import '@fontsource/roboto';
import theme from './assets/theme';
import { ThemeProvider } from '@mui/material';
import Hero from './components/Hero';
import Coffee from './components/Coffee';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Order from './components/Order';
import { CartProvider } from './components/CartContext';
import Layout from './components/Layout';
import CoffeeStats from './components/CoffeeStats';
import Payment from './components/Payment';
import ErrorBoundary from './components/ErrorBoundary';


const App = () => {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Router>
          <ThemeProvider theme={theme}>
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
                <Route path="/stats" element={<CoffeeStats /> } />
                <Route path='/payment' element={<Payment />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </Router>
      </CartProvider>
    </ErrorBoundary>
  )
}

export default App;