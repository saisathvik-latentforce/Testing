import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { AnimatePresence } from 'motion/react';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import PageTransition from './PageTransition';

const Layout = () => {
  const location = useLocation();

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />
      <Toolbar sx={{ minHeight: { xs: '64px !important', sm: '72px !important' } }} />
      <Box
        component="main"
        id="main-content"
        tabIndex={-1}
        sx={{ minHeight: 'calc(100vh - 72px)', pb: { xs: 9, sm: 0 }, outline: 'none' }}
      >
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Layout;
