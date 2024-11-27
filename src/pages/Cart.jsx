import React from "react";
import { useCart } from "../context/CartContext";
import { Button, Typography, IconButton } from "@mui/material";
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
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">Carrito de Compras</Typography>
      <Typography variant="h6" style={{ margin: "20px 0" }}>
        Productos en el carrito: {cartItemsCount}
      </Typography>

      {cart.length === 0 ? (
        <Typography>No hay productos en tu carrito.</Typography>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              marginBottom: "15px",
              alignItems: "center",
            }}
          >
            {/* Imagen del producto */}
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                marginRight: "15px",
              }}
            />
            <Typography variant="body1" style={{ flexGrow: 1 }}>
              {item.name} - ${item.price} x {item.quantity}
            </Typography>
            <IconButton
              onClick={() => removeFromCart(item.id)}
              aria-label="remove"
            >
              <Delete />
            </IconButton>
          </div>
        ))
      )}

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Total: ${cartTotal.toFixed(2)}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        component={Link}
        to="/checkout"
      >
        Finalizar compra
      </Button>
    </div>
  );
};

export default Cart;
