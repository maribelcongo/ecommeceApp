import React from "react";
import { useCart } from "../context/CartContext";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext"; // Importar el contexto

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate(); // Usamos `useNavigate` para navegar hacia atrás
  const { showNotification } = useNotification(); // Usamos el contexto de notificación

  const cartTotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const cartItemsCount = cart.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  // Función para incrementar la cantidad de un producto
  const handleIncreaseQuantity = (id) => {
    updateQuantity(id, 1); // Aumenta la cantidad en 1
    showNotification("Producto agregado al carrito");
  };

  // Función para disminuir la cantidad de un producto
  const handleDecreaseQuantity = (id) => {
    updateQuantity(id, -1); // Disminuye la cantidad en 1
  };

  // Función para ir hacia atrás
  const handleGoBack = () => {
    navigate(-1); // Vuelve a la página anterior
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: 2,
        fontFamily: "Skranji",
        width: { xs: "100%", sm: "70%" },
        margin: "auto",
        marginTop: "30px",
      }}
    >
      <Button
        variant="outlined"
        onClick={handleGoBack}
        style={{
          marginBottom: "30px",
          color: "#c55e82",
          borderColor: "#c55e82",
        }}
      >
        Atrás
      </Button>

      <Typography
        variant="h4"
        sx={{
          color: "#c55e82",
          fontWeight: "bold",
          mb: 2,
          fontFamily: "Skranji",
        }}
      >
        Carrito de Compras
      </Typography>
      <Typography variant="h6" sx={{ margin: "20px 0", fontFamily: "Skranji" }}>
        Productos en el carrito: {cartItemsCount}
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body1" sx={{ fontFamily: "Skranji" }}>
          No hay productos en tu carrito.
        </Typography>
      ) : (
        cart.map((item) => (
          <Card
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              marginBottom: 2,
              borderRadius: "8px",
              boxShadow: 1,
              backgroundColor: "#fff",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {/* Imagen del producto */}
            <CardMedia
              component="img"
              sx={{
                width: 80,
                height: 80,
                objectFit: "cover",
                marginRight: 2,
                borderRadius: "4px",
                marginBottom: { xs: 2, sm: 0 },
              }}
              image={item.image}
              alt={item.name}
            />
            <CardContent
              sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontFamily: "Skranji" }}
              >
                {item.name}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: "Skranji" }}>
                ${item.price} x {item.quantity}
              </Typography>
            </CardContent>

            {/* Contador de cantidad */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={() => handleDecreaseQuantity(item.id)}
                disabled={item.quantity <= 1}
                sx={{ color: "#c55e82", "&:hover": { color: "#b04a6e" } }}
              >
                -
              </IconButton>
              <Typography sx={{ fontFamily: "Skranji" }}>
                {item.quantity}
              </Typography>
              <IconButton
                onClick={() => handleIncreaseQuantity(item.id)}
                sx={{ color: "#c55e82", "&:hover": { color: "#b04a6e" } }}
              >
                +
              </IconButton>
            </Box>

            <IconButton
              onClick={() => removeFromCart(item.id)}
              aria-label="remove"
              sx={{ color: "#c55e82", "&:hover": { color: "#b04a6e" } }}
            >
              <Delete />
            </IconButton>
          </Card>
        ))
      )}

      <Typography
        variant="h6"
        sx={{ marginTop: "20px", fontFamily: "Skranji" }}
      >
        Total: ${cartTotal.toFixed(2)}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{
          marginTop: "20px",
          backgroundColor: "#c55e82",
          "&:hover": { backgroundColor: "#b04a6e" },
        }}
        component={Link}
        to="/checkout"
        disabled={cart.length === 0}
      >
        Finalizar compra
      </Button>
    </Box>
  );
};

export default Cart;
