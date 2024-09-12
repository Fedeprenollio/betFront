import React, { useState } from "react";
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
import { useBoundStore } from "../stores";
import TemporaryDrawer from "./drawer/TemporaryDrawer";
import { CaroulselCurrentSeason } from "../componts/caroulselCurrentSeason/CaroulselCurrentSeason";
import CarouselLogos from "../componts/caroulselLogos/CaroulselLogos";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElPartidos, setAnchorElPartidos] = useState(null);
  const [anchorElEquipos, setAnchorElEquipos] = useState(null);
  const [anchorElLeagues, setAnchorElLeagues] = useState(null);
  const [anchorElReferee, setAnchorElReferee] = useState(null);

  const [anchorElAyudanos, setAnchorElAyudanos] = useState(null);
  const [anchorElAyudanosMobile, setAnchorElAyudanosMobile] = useState(null);
  const { user, isAuthenticated, logout } = useBoundStore((state) => state);
  const handleMenuPartidos = (event) => {
    setAnchorElPartidos(event.currentTarget);
  };

  const handleMenuEquipos = (event) => {
    setAnchorElEquipos(event.currentTarget);
  };

  const handleMenuLeagues = (event) => {
    setAnchorElLeagues(event.currentTarget);
  };
  const handleMenuReferee = (event) => {
    setAnchorElReferee(event.currentTarget);
  };

  const handleMenuAyudanos = (event) => {
    setAnchorElAyudanos(event.currentTarget);
  };

  const handleMenuAyudanosMobile = (event) => {
    setAnchorElAyudanosMobile(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElPartidos(null);
    setAnchorElEquipos(null);
    setAnchorElLeagues(null);
    setAnchorElReferee(null);

    setAnchorElAyudanos(null);
    setAnchorElAyudanosMobile(null);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/user/login");
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isAuthenticated && <Typography>Hola {user && user}</Typography>}
            <IconButton
              component={Link}
              to="/"
              aria-label="home"
              sx={{ display: { md: "flex" }, mr: 1 }}
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
            {/* <TemporaryDrawer /> */}
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
                anchorEl={anchorElLeagues}
                open={Boolean(anchorElLeagues)}
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
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/league/admin"
                  >
                    Administrar ligas
                  </MenuItem>
                )}
                {isAuthenticated && (
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/league/season/admin"
                  >
                    Administrar temporadas
                  </MenuItem>
                )}
              </Menu>
            </Box>

            

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Box sx={{ flexGrow: 1 }}>
              <Button
                id="ligas-button"
                aria-controls="ligas-menu"
                aria-haspopup="true"
                onClick={handleMenuReferee}
                sx={{ color: "inherit" }}
              >
                Árbitros
              </Button>
              <Menu
                id="ligas-menu"
                anchorEl={anchorElReferee}
                open={Boolean(anchorElReferee)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to="/referee">
                  Ver árbitros
                </MenuItem>
                {isAuthenticated && (
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/referee/admin"
                  >
                    Administrar árbitros
                  </MenuItem>
                )}
                {isAuthenticated && (
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/referee/admin"
                  >
                    Administrar temporadas
                  </MenuItem>
                )}
              </Menu>
            </Box>
              <Button
                id="ayudanos-button"
                aria-controls="ayudanos-menu"
                aria-haspopup="true"
                onClick={handleMenuAyudanos}
                sx={{ color: "inherit" }}
              >
                Sé parte
              </Button>
              <Menu
                id="ayudanos-menu"
                anchorEl={anchorElAyudanos}
                open={Boolean(anchorElAyudanos)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to="/cafecito">
                  Cafecito
                </MenuItem>
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuAyudanosMobile}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElAyudanosMobile}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElAyudanosMobile)}
                onClose={handleClose}
              >
               <Box sx={{ flexGrow: 1 }}>
              <Button
                id="ligas-button"
                aria-controls="ligas-menu"
                aria-haspopup="true"
                onClick={handleMenuReferee}
                sx={{ color: "inherit" }}
              >
                Árbitros
              </Button>
              <Menu
                id="ligas-menu"
                anchorEl={anchorElReferee}
                open={Boolean(anchorElReferee)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to="/referee">
                  Ver árbitros
                </MenuItem>
                {isAuthenticated && (
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/referee/admin"
                  >
                    Administrar árbitros
                  </MenuItem>
                )}
                {isAuthenticated && (
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/referee/admin"
                  >
                    Administrar temporadas
                  </MenuItem>
                )}
              </Menu>
            </Box>
                <MenuItem onClick={handleClose} component={Link} to="/cafecito">
                  Cafecito
                </MenuItem>
                {!isAuthenticated && (
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/user/login"
                  >
                    Login
                  </MenuItem>
                )}

                {isAuthenticated && (
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                )}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
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

                {isAuthenticated && (
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <CaroulselCurrentSeason />
      <CarouselLogos />
    </>
  );
};

export default Navbar;
