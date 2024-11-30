import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Usamos el hook del carrito
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, checkout } = useCart(); // Accedemos al carrito y la función de checkout
  const navigate = useNavigate(); // Usamos el hook para navegar
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Manejar el cambio de los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si los campos del usuario están completos
    if (!userInfo.name || !userInfo.email || !userInfo.address) {
      alert("Por favor completa todos los campos del formulario.");
      return;
    }

    // Verificar si el carrito tiene productos
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    // Llamamos a la función de checkout y pasamos la información del usuario y el carrito
    const orderId = await checkout(userInfo, cart);

    if (orderId) {
      // Redirigimos a la página de confirmación de la orden con el ID de la orden
      navigate(`/order-confirmation/${orderId}`);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        marginTop: 5,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
        Checkout
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="name"
          value={userInfo.name}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          value={userInfo.email}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Dirección"
          name="address"
          value={userInfo.address}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#c55e82",
              padding: "10px 20px",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#d81b60",
              },
            }}
          >
            Finalizar Compra
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Checkout;
