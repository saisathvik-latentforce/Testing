import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar, { drawerWidthOpen, drawerWidthClosed } from "./Navbar";

const Layout = () => {
  const [open, setOpen] = useState(false); // sidebar state

  return (
    <Box sx={{ display: "flex" }}>
      {/* Navbar (AppBar + Drawer) */}
      <Navbar open={open} setOpen={setOpen} />

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { sm: `${open ? drawerWidthOpen : drawerWidthClosed}px` }, // shift content when drawer opens
          transition: "margin 0.3s",
        }}
      >
        {/* Keeps spacing below AppBar */}
        <Toolbar />

        {/* Render child routes */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
