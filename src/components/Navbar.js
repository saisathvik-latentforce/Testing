import React, { useContext } from 'react';
import { useTheme, alpha } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Autocomplete,
  TextField,
  Tooltip,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  Coffee as CoffeeIcon,
  ShoppingCart,
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import DataExplorationSharpIcon from '@mui/icons-material/DataExplorationSharp';
import BarChartIcon from '@mui/icons-material/BarChart';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ThemeContext } from '../context/ThemeContext';
import products from '../assets/coffee';

import { useCart } from './CartContext';

export const drawerWidthOpen = 200;
export const drawerWidthClosed = 60;

const drawerLinks = [
  { text: 'Home', link: '/', icon: <HomeIcon />, type: 'route' },
  { text: 'Coffee', link: '#coffee', icon: <CoffeeIcon />, type: 'anchor' },
  { text: 'Coffee Stats', link: '/stats', icon: <DataExplorationSharpIcon />, type: 'route' },
];

const Navbar = ({ open, setOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const navigate = useNavigate();

  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const { mode, toggleTheme } = useContext(ThemeContext);

  const toggleSidebar = () => setOpen(!open);

  /* map route → BottomNav index */
  const bottomNavValue = () => {
    if (location.pathname === '/') return 0;
    if (location.pathname === '/orders') return 2;
    if (location.pathname === '/stats') return 3;
    return 0;
  };

  const navButtonSx = {
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    px: 2.5,
    mx: 1,
    my: 0.5,
    borderRadius: 2,
    transition: 'background-color 0.2s, transform 0.2s',
    '&:hover': { backgroundColor: alpha('#fff', 0.12), transform: 'translateX(2px)' },
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List role="navigation" aria-label="Main navigation">
        {drawerLinks.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <Tooltip title={!open ? item.text : ''} placement="right">
              {item.type === 'anchor' ? (
                <ListItemButton component="a" href={item.link} sx={navButtonSx}>
                  <ListItemIcon
                    sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                </ListItemButton>
              ) : (
                <ListItemButton
                  component={Link}
                  to={item.link}
                  sx={{
                    ...navButtonSx,
                    ...(item.link === location.pathname && {
                      backgroundColor: alpha('#fff', 0.22),
                      borderLeft: '3px solid #fff',
                      borderRadius: 1,
                      pl: 1.5,
                      '&:hover': { backgroundColor: alpha('#fff', 0.28) },
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                </ListItemButton>
              )}
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Visually-hidden skip link */}
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'absolute',
          top: -60,
          left: 8,
          zIndex: 9999,
          background: 'primary.main',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: 1,
          fontWeight: 'bold',
          transition: 'top 0.2s',
          '&:focus': { top: 8 },
        }}
      >
        Skip to main content
      </Box>

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: t => t.zIndex.drawer + 1,
          ml: !isMobile ? `${open ? drawerWidthOpen : drawerWidthClosed}px` : 0,
          width: !isMobile
            ? `calc(100% - ${open ? drawerWidthOpen : drawerWidthClosed}px)`
            : '100%',
          transition: 'all 0.3s',
        }}
      >
        <Toolbar>
          <IconButton
            onClick={toggleSidebar}
            color="inherit"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          <CoffeeIcon sx={{ ml: 1 }} />
          <Typography variant="h6" noWrap sx={{ letterSpacing: 0.5 }}>
            Coffee Shop
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Search */}
          <Autocomplete
            freeSolo
            disableClearable
            sx={{ width: { xs: '40%', sm: '30%', md: '20%' } }}
            options={products.map(item => item.title)}
            renderInput={params => (
              <TextField
                {...params}
                label="Search coffee"
                size="small"
                inputProps={{ ...params.inputProps, 'aria-label': 'Search coffee products' }}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: alpha('#fff', 0.15),
                    borderRadius: 2,
                    '& fieldset': { borderColor: alpha('#fff', 0.3) },
                    '&:hover fieldset': { borderColor: alpha('#fff', 0.5) },
                    '&.Mui-focused fieldset': { borderColor: '#fff' },
                  },
                  '& .MuiInputLabel-root': { color: alpha('#fff', 0.8) },
                  '& .MuiInputBase-input': { color: '#fff' },
                  '& .MuiSvgIcon-root': { color: alpha('#fff', 0.8) },
                }}
              />
            )}
            onChange={(_event, value) => {
              if (value) {
                const el = document.getElementById(value.toLowerCase().replace(/\s+/g, '-'));
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />

          {/* Dark / Light mode toggle */}
          <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              sx={{
                ml: 1,
                transition: 'transform 0.4s',
                '&:hover': { transform: 'rotate(20deg)' },
              }}
            >
              {mode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>

          {/* Cart */}
          <Tooltip title={`Cart: ${itemCount} item${itemCount !== 1 ? 's' : ''}`}>
            <IconButton
              component={Link}
              to="/orders"
              color="inherit"
              aria-label={`Shopping cart, ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer — desktop only */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidthOpen : drawerWidthClosed,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: open ? drawerWidthOpen : drawerWidthClosed,
              transition: 'width 0.3s',
              overflowX: 'hidden',
              backgroundImage: t =>
                `linear-gradient(165deg, ${t.palette.primary.main} 0%, ${alpha(t.palette.primary.dark || t.palette.primary.main, 0.85)} 100%)`,
              color: 'white',
              borderRight: 'none',
            },
          }}
        >
          <Toolbar />
          {drawerContent}
        </Drawer>
      )}

      {/* Mobile drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={open}
          onClose={toggleSidebar}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidthOpen,
              backgroundImage: t =>
                `linear-gradient(165deg, ${t.palette.primary.main} 0%, ${alpha(t.palette.primary.dark || t.palette.primary.main, 0.85)} 100%)`,
              color: 'white',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Bottom navigation — mobile only */}
      {isMobile && (
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: t => t.zIndex.appBar }}
          elevation={3}
        >
          <BottomNavigation
            value={bottomNavValue()}
            onChange={(_e, newValue) => {
              const routes = ['/', '#coffee', '/orders', '/stats'];
              if (routes[newValue].startsWith('#')) {
                const el = document.querySelector(routes[newValue]);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              } else {
                navigate(routes[newValue]);
              }
            }}
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} aria-label="Go to home" />
            <BottomNavigationAction
              label="Coffee"
              icon={<CoffeeIcon />}
              aria-label="Go to coffee menu"
            />
            <BottomNavigationAction
              label="Cart"
              icon={
                <Badge badgeContent={itemCount} color="secondary">
                  <ShoppingCart />
                </Badge>
              }
              aria-label={`Cart, ${itemCount} items`}
            />
            <BottomNavigationAction
              label="Stats"
              icon={<BarChartIcon />}
              aria-label="Go to statistics"
            />
          </BottomNavigation>
        </Paper>
      )}
    </>
  );
};

Navbar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Navbar;
