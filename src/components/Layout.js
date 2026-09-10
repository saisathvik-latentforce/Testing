import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

import Navbar, { drawerWidthOpen, drawerWidthClosed } from './Navbar';
import PageTransition from './PageTransition';

const Layout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar open={open} setOpen={setOpen} />

      <Box
        component="main"
        id="main-content"
        tabIndex={-1}
        sx={{
          flexGrow: 1,
          position: 'relative',
          p: { xs: 1, sm: 3 },
          ml: { sm: `${open ? drawerWidthOpen : drawerWidthClosed}px` },
          transition: 'margin 0.3s',
          outline: 'none',
          backgroundImage: t =>
            `radial-gradient(circle at 100% 0%, ${t.palette.primary.main}0d 0%, transparent 45%)`,
          backgroundAttachment: 'fixed',
        }}
      >
        <Toolbar />
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
