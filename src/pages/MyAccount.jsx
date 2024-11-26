import React from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  // Redirigir si el usuario no está autenticado
  if (!currentUser) {
    navigate("/login");
    return null;
  }

  // Lógica para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirigir a la página de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Función para cerrar el formulario y redirigir
  const handleClose = () => {
    navigate("/"); // Redirigir a la página de inicio u otra ruta
  };

  // Calcular el total del carrito, asegurándonos de que el precio sea un número
  const total = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    return acc + price * item.quantity;
  }, 0);

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "#c55e82", fontWeight: "bold", mb: 2 }}
      >
        Mi Cuenta
      </Typography>
      <Typography variant="h6">
        Nombre: {currentUser.displayName || currentUser.email}
      </Typography>
      <Typography variant="h6">Email: {currentUser.email}</Typography>

      {cart.length > 0 ? (
        <>
          <Typography variant="h6">
            Tienes {cart.length} productos en tu carrito.
          </Typography>
          <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            {cart.map((item, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  borderRadius: "8px",
                  boxShadow: 1,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 100, height: 100, borderRadius: "4px" }}
                  image={item.image}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body1">
                    ${(Number(item.price) || 0).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      ) : (
        <Typography variant="h6">Tu carrito está vacío.</Typography>
      )}

      {/* Botón para cerrar el formulario */}
      <Button
        variant="outlined"
        sx={{
          mt: 2,
          ml: 2,
          borderColor: "#c55e82",
          color: "#c55e82",
          "&:hover": { borderColor: "#b04a6e", color: "#b04a6e" },
        }}
        onClick={handleClose}
      >
        Cerrar
      </Button>
    </Box>
  );
};

export default MyAccount;
