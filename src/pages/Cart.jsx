import React from "react";
import { useCart } from "../context/CartContext";
import {
  Button,
  Typography,
  IconButton,
  Box,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const cartTotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const cartItemsCount = cart.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: 2,
        fontFamily: "Skranji", // Aplicar la fuente Skranji
        width: "70%",
        margin: "auto",
        marginTop: "30px",
      }}
    >
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
      <Typography
        variant="h6"
        sx={{
          margin: "20px 0",
          fontFamily: "Skranji",
        }}
      >
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
            <IconButton
              onClick={() => removeFromCart(item.id)}
              aria-label="remove"
              sx={{
                color: "#c55e82",
                "&:hover": { color: "#b04a6e" },
              }}
            >
              <Delete />
            </IconButton>
          </Card>
        ))
      )}

      <Typography
        variant="h6"
        sx={{
          marginTop: "20px",
          fontFamily: "Skranji",
        }}
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
      >
        Finalizar compra
      </Button>
    </Box>
  );
};

export default Cart;
