import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TemporaryDrawer from "../../pages/drawer/TemporaryDrawer";
import { Box } from "@mui/material";

const FloatingDrawerButton = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };

  return (
    <Box>
    <IconButton
      onClick={toggleDrawer}
      sx={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        zIndex: 1300, // Asegúrate de que esté por encima de otros elementos
        backgroundColor: 'primary.main',
        color: 'white',
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
      }}
    >
      
    <TemporaryDrawer />
    </IconButton>
  </Box>
  );
};

export default FloatingDrawerButton;
