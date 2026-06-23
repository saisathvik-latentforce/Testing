import { useTheme } from "@mui/material/styles";
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
} from "@mui/material";

import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  Coffee as CoffeeIcon,
  PlaylistAdd as PlaylistAddIcon,
  ShoppingCart,
} from "@mui/icons-material";
import DataExplorationSharpIcon from '@mui/icons-material/DataExplorationSharp';

import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useCart } from "./CartContext";
import products from "../assets/coffee";

export const drawerWidthOpen = 200;
export const drawerWidthClosed = 60;

const Navbar = ({ open, setOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleSidebar = () => setOpen(!open);

  const drawerLinks = [
    { text: "Home", link: "/", icon: <HomeIcon />, type: "route" },
    { text: "Coffee", link: "#coffee", icon: <CoffeeIcon />, type: "anchor" },
    // { text: "Add Item", link: "/newitem", icon: <PlaylistAddIcon />, type: "route" },
    { text: "Coffee Stats", link: "/stats", icon: <DataExplorationSharpIcon />, type: "route" },

  ];

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <List>
        {drawerLinks.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            {item.type === "anchor" ? (
              <Tooltip title={!open ? item.text : ""} placement="right">
                <ListItemButton
                  component="a"
                  href={item.link}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    transition: "all 0.3s",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                </ListItemButton>
              </Tooltip>
            ) : (
              <Tooltip title={!open ? item.text : ""} placement="right">
                <ListItemButton
                  component={Link}
                  to={item.link}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    transition: "all 0.3s",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                </ListItemButton>
              </Tooltip>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          ml: !isMobile ? `${open ? drawerWidthOpen : drawerWidthClosed}px` : 0,
          width: !isMobile
            ? `calc(100% - ${open ? drawerWidthOpen : drawerWidthClosed}px)`
            : "100%",
          transition: "all 0.3s",
        }}
      >
        <Toolbar>
          <IconButton onClick={toggleSidebar} color="inherit">
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          <CoffeeIcon sx={{ ml: 1 }} />
          <Typography variant="h6" noWrap sx={{fontFamily: "Eagle Lake"}}>
            Coffee Shop
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Search */}
          <Autocomplete
            freeSolo
            disableClearable
            sx={{ width: "20%" }}
            options={products.map((item) => item.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search coffee"
                size = "small"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            onChange={(event, value) => {
              if (value) {
                const id = value.toLowerCase().replace(/\s+/g, "-");
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />

          {/* Cart */}
          <IconButton component={Link} to="/orders" color="inherit" sx={{ ml: 2 }}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={toggleSidebar}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidthOpen,
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidthOpen : drawerWidthClosed,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: open ? drawerWidthOpen : drawerWidthClosed,
              transition: "width 0.3s",
              overflowX: "hidden",
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
        >
          <Toolbar />
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Navbar;





















// import React, { useState } from 'react'

// import CoffeeIcon from '@mui/icons-material/Coffee';
// import MenuIcon from '@mui/icons-material/Menu';
// import { ShoppingCart } from "@mui/icons-material";
// import HomeIcon from '@mui/icons-material/Home';
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

// import { AppBar, Toolbar, Typography, Container, Button,Box, List, ListItem, ListItemButton, ListItemText, IconButton, Badge} from '@mui/material'
// import { useMediaQuery, Drawer, useTheme } from '@mui/material'
// import { Link } from 'react-router-dom';
// import { useCart } from "./CartContext";

// const Navbar = () => {
//     const [drawerOpen,setDrawerOpen] = useState(false);
//     const theme = useTheme();

//     const toggleDrawer = (open) => () => {
//         setDrawerOpen(open)
//     }

//     const { cart } = useCart();

//     const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

//     const drawerLinks = [
//         {
//             text: "Home",link:"#home",type:"route"
//         },
//         {
//             text:"Coffee", link:"#coffee",type:"anchor"
//         },
//         {
//             text:"Order", link:"#orders", type:"anchor" 
//         },
//         {
//             text:"Add New Item", link:"/newitem",type:"route"
//         }
//     ]

//     return (
//         <>
//             <AppBar position="sticky" color="primary">
//                 <Container >
//                     <Toolbar>
//                         <CoffeeIcon />
//                         <Typography variant="h5" >
//                             Coffee Shop 
//                         </Typography>
                        
//                         <IconButton color='inherit' onClick={toggleDrawer(true)}>
//                             <MenuIcon />
//                         </IconButton>
                        
//                         <HomeIcon />
//                         <Button color="inherit" component={Link} to='/'>
//                             Home
//                         </Button>

//                         <Button color="inherit" href='#coffee'>
//                             Coffee
//                         </Button>

//                         <PlaylistAddIcon />
//                         <Button component={Link} color="inherit" to='/newitem'>
//                             Add New Item
//                         </Button>

                       
//                         {/* Cart Icon */}
//                         <IconButton href='#orders' color="inherit">
//                             <Badge badgeContent={itemCount} color="secondary">
//                                 <ShoppingCart />
//                             </Badge>
//                         </IconButton>
//                     </Toolbar>
//                 </Container>
//             </AppBar>

//             <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ '& .MuiDrawer-paper': {backgroundColor: 'primary.main', color: 'white'} }}>
//                 <Box sx={{ width: 200, }}  role="presentation" onClick={toggleDrawer(false)}>
//                 <List>
//                     {drawerLinks.map((linkItem, index) => (
//                     <ListItem key={index} disablePadding>
//                         {linkItem.type === 'anchor' ? (
//                         <ListItemButton component="a" href={linkItem.link}>
//                             <ListItemText primary={linkItem.text} />
//                         </ListItemButton>
//                         ) : (
//                         <ListItemButton component={Link} to={linkItem.link}>
//                             <ListItemText primary={linkItem.text} />
//                         </ListItemButton>
//                         )}
//                     </ListItem>
//                     ))}
//                 </List>
//                 </Box>
//             </Drawer>
//         </>
//     )
// }

// export default Navbar