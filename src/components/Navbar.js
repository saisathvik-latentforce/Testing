import React, { useContext } from 'react';
import {
  AppBar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  BarChartRounded,
  CoffeeRounded,
  DarkModeRounded,
  HomeRounded,
  LightModeRounded,
  ShoppingBagOutlined,
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ThemeContext } from '../context/ThemeContext';

import { useCart } from './CartContext';

const navItems = [
  { label: 'Menu', path: '/' },
  { label: 'Insights', path: '/stats' },
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { mode, toggleTheme } = useContext(ThemeContext);

  const bottomValue = location.pathname === '/orders' ? 1 : location.pathname === '/stats' ? 2 : 0;

  return (
    <>
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'fixed',
          top: -60,
          left: 12,
          zIndex: 2000,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          px: 2,
          py: 1,
          borderRadius: 2,
          '&:focus': { top: 12 },
        }}
      >
        Skip to content
      </Box>

      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, sm: 72 }, gap: 2 }}>
            <Stack
              component={Link}
              to="/"
              direction="row"
              alignItems="center"
              spacing={1.25}
              sx={{ textDecoration: 'none', color: 'inherit', flexShrink: 0 }}
              aria-label="Roast and Ritual home"
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                }}
              >
                <CoffeeRounded fontSize="small" />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: 'Georgia, serif', lineHeight: 1, fontWeight: 700 }}
                >
                  Roast & Ritual
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: { xs: 'none', md: 'block' }, letterSpacing: '.08em' }}
                >
                  SMALL BATCH COFFEE
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ flex: 1 }} />

            <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {navItems.map(item => {
                const selected = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    color="inherit"
                    aria-current={selected ? 'page' : undefined}
                    sx={{
                      minHeight: 40,
                      bgcolor: selected ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>

            <Tooltip title={`Use ${mode === 'dark' ? 'light' : 'dark'} theme`}>
              <IconButton
                onClick={toggleTheme}
                aria-label={`Use ${mode === 'dark' ? 'light' : 'dark'} theme`}
              >
                {mode === 'dark' ? <LightModeRounded /> : <DarkModeRounded />}
              </IconButton>
            </Tooltip>

            <Button
              component={Link}
              to="/orders"
              variant="contained"
              startIcon={
                <Badge badgeContent={itemCount} color="secondary" max={99}>
                  <ShoppingBagOutlined fontSize="small" />
                </Badge>
              }
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, minWidth: 112 }}
            >
              My order
            </Button>
            <IconButton
              component={Link}
              to="/orders"
              aria-label={`My order, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
              sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
            >
              <Badge badgeContent={itemCount} color="secondary" max={99}>
                <ShoppingBagOutlined />
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {isMobile && (
        <Paper
          sx={{
            position: 'fixed',
            inset: 'auto 0 0',
            zIndex: t => t.zIndex.appBar,
            borderTop: '1px solid',
            borderColor: 'divider',
            borderRadius: 0,
          }}
        >
          <BottomNavigation
            value={bottomValue}
            onChange={(_event, next) => navigate(['/', '/orders', '/stats'][next])}
            showLabels
          >
            <BottomNavigationAction label="Menu" icon={<HomeRounded />} />
            <BottomNavigationAction
              label="Order"
              icon={
                <Badge badgeContent={itemCount} color="secondary">
                  <ShoppingBagOutlined />
                </Badge>
              }
            />
            <BottomNavigationAction label="Insights" icon={<BarChartRounded />} />
          </BottomNavigation>
        </Paper>
      )}
    </>
  );
};

export default Navbar;
