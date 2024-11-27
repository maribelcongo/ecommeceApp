import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { ShoppingCart, Person, Menu as MenuIcon } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/encantadaLogo.jpg";
import "./navbar.css";
import RegisterForm from "../../components/admin/RegisterForm";
import LoginForm from "../../components/admin/LoginForm";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElMenu, setAnchorElMenu] = useState(null);

  const { cart } = useCart();
  const { currentUser, logout } = useAuth();

  const handleMenuOpen = (event) => setAnchorElMenu(event.currentTarget);
  const handleMenuClose = () => setAnchorElMenu(null);
  const handleUserMenuOpen = (event) => setAnchorElUser(event.currentTarget);
  const handleUserMenuClose = () => setAnchorElUser(null);

  const cartItemsCount = cart.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  // Verificar si estamos en la página de inicio
  const isHomePage = location.pathname === "/";

  return (
    <AppBar position="static" sx={{ backgroundColor: "#333" }}>
      <Toolbar
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          height: { xs: 170, sm: 130 },
          background: "#fff",
          alignItems: "center",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, color: "#c55e82" }}
          onClick={handleMenuOpen}
        >
          <MenuIcon sx={{ fontSize: 30 }} />
        </IconButton>

        {/* Logo con enlace al inicio */}
        <Typography component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={logo} alt="Logo" style={{ height: 85 }} />
          </Link>
        </Typography>

        {currentUser && (
          <Typography
            className="saludo"
            sx={{
              marginRight: 2,
              color: "#c55e82",
              fontFamily: "Skranji, sans-serif",
            }}
          >
            Hola, {currentUser.displayName}
          </Typography>
        )}

        {/* Ícono de carrito */}
        <IconButton
          color="inherit"
          sx={{ color: "#c55e82" }}
          onClick={() => navigate("/carrito")} // Redirigir al carrito
        >
          <Badge
            badgeContent={cartItemsCount}
            color="error"
            sx={{ "& .MuiBadge-dot": { backgroundColor: "#ff5722" } }}
          >
            <ShoppingCart sx={{ fontSize: 30 }} />
          </Badge>
        </IconButton>

        <IconButton
          edge="end"
          color="inherit"
          aria-label="user"
          sx={{ color: "#c55e82" }}
          onClick={handleUserMenuOpen}
        >
          <Person sx={{ fontSize: 30 }} />
        </IconButton>

        {/* Menú de usuario */}
        <Menu
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={handleUserMenuClose}
        >
          {!currentUser ? (
            <>
              <MenuItem
                onClick={() => {
                  handleUserMenuClose();
                  navigate("/login");
                }}
              >
                Iniciar Sesión
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleUserMenuClose();
                  navigate("/register");
                }}
              >
                Registrarse
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                onClick={() => {
                  handleUserMenuClose();
                  navigate("/mi-cuenta");
                }}
              >
                Mi Cuenta
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout();
                  handleUserMenuClose();
                }}
              >
                Cerrar Sesión
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>

      {/* Menú de hamburguesa */}
      <Menu
        anchorEl={anchorElMenu}
        open={Boolean(anchorElMenu)}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <Typography
            variant="h6"
            sx={{
              backgroundColor: "#f8bbd0",
              cursor: "default",
              fontFamily: "'Spicy Rice', cursive",
            }}
          >
            Nuestros Productos
          </Typography>
        </MenuItem>
        <div>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/Todos");
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#f8bbd0",
                fontFamily: "'Spicy Rice', cursive",
              },
              fontFamily: "'Spicy Rice', cursive",
            }}
          >
            Todos
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/carteras");
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#f8bbd0",
                fontFamily: "'Spicy Rice', cursive",
              },
              fontFamily: "'Spicy Rice', cursive",
            }}
          >
            Carteras
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/mochilas");
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#f8bbd0",
                fontFamily: "'Spicy Rice', cursive",
              },
              fontFamily: "'Spicy Rice', cursive",
            }}
          >
            Mochilas
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/billeteras");
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#f8bbd0",
                fontFamily: "'Spicy Rice', cursive",
              },
              fontFamily: "'Spicy Rice', cursive",
            }}
          >
            Billeteras
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/riñoneras");
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#f8bbd0",
                fontFamily: "'Spicy Rice', cursive",
              },
              fontFamily: "'Spicy Rice', cursive",
            }}
          >
            Riñoneras
          </MenuItem>
        </div>
      </Menu>

      {!isHomePage && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            zIndex: 1,
            backgroundColor: "#c55e82",
          }}
          onClick={() => navigate("/")}
        >
          Inicio
        </Button>
      )}
    </AppBar>
  );
};

export default Navbar;
