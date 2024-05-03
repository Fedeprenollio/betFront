import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import AdbIcon from "@mui/icons-material/Adb";
import { useBoundStore } from "../stores";

// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
const  navigate = useNavigate()
  const [anchorElPartidos, setAnchorElPartidos] = useState(null);
  const [anchorElEquipos, setAnchorElEquipos] = useState(null);
  const [anchorLeagues, setAnchorLeagues] = useState(null);
  const { decodeTokenFromCookie, user, isAuthenticated,logout } = useBoundStore(
    (state) => state
  );

  useEffect(() => {
    const cookie = document.cookie;
    decodeTokenFromCookie(cookie);
  }, [decodeTokenFromCookie]);

  const handleMenuPartidos = (event) => {
    setAnchorElPartidos(event.currentTarget);
  };

  const handleMenuEquipos = (event) => {
    setAnchorElEquipos(event.currentTarget);
  };

  const handleMenuLeagues = (event) => {
    setAnchorLeagues(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElPartidos(null);
    setAnchorElEquipos(null);
    setAnchorLeagues(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout =async () => {
    // deleteCookie("jwt")
    await logout()
    navigate("/user/login");
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // Redirigir al usuario después de eliminar la cookie
    navigate("/user/login");
  };

  
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <h4>Hola {user?.user}</h4>
          <IconButton
            component={Link}
            to="/"
            aria-label="home"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <Button
              id="partidos-button"
              aria-controls="partidos-menu"
              aria-haspopup="true"
              onClick={handleMenuPartidos}
              sx={{ color: "inherit" }}
            >
              Partidos
            </Button>
            <Menu
              id="partidos-menu"
              anchorEl={anchorElPartidos}
              open={Boolean(anchorElPartidos)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/match">
                Ver partidos
              </MenuItem>

              {isAuthenticated && (
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/match/new"
                >
                  Administrar Partidos
                </MenuItem>
              )}
              {/* <MenuItem
                onClick={handleClose}
                component={Link}
                to="/match/addResults"
              >
                Agregar resultados
              </MenuItem> */}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Button
              id="equipos-button"
              aria-controls="equipos-menu"
              aria-haspopup="true"
              onClick={handleMenuEquipos}
              sx={{ color: "inherit" }}
            >
              Equipos
            </Button>
            <Menu
              id="equipos-menu"
              anchorEl={anchorElEquipos}
              open={Boolean(anchorElEquipos)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/teams">
                Ver equipos
              </MenuItem>

              {isAuthenticated && (
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/teams/adm"
                >
                  Administrar equipos
                </MenuItem>
              )}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Button
              id="ligas-button"
              aria-controls="ligas-menu"
              aria-haspopup="true"
              onClick={handleMenuLeagues}
              sx={{ color: "inherit" }}
            >
              Ligas
            </Button>
            <Menu
              id="ligas-menu"
              anchorEl={anchorLeagues}
              open={Boolean(anchorLeagues)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/league/view"
              >
                Ver ligas
              </MenuItem>
              {isAuthenticated && (
                <MenuItem onClick={handleClose} component={Link} to="/league">
                  Administrar ligas
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!isAuthenticated && (
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/user/login"
                >
                  Login
                </MenuItem>
              )}

              {isAuthenticated && 
               <MenuItem onClick={handleLogout}>Logout</MenuItem>
              
              }

              {/* <MenuItem
                onClick={handleClose}
                component={Link}
                to="/user/register"
              >
                Registrate
              </MenuItem> */}
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
