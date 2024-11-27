import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Usamos el hook del carrito
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, checkout } = useCart(); // Accedemos al carrito y la función de checkout
  const navigate = useNavigate(); // Usamos el hook para navegar
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Llamamos a la función de checkout y pasamos la información del usuario
    const orderId = await checkout(userInfo);

    if (orderId) {
      // Redirigimos a la página de confirmación de la orden
      navigate(`/order-confirmation/${orderId}`);
    }
  };

  return (
    <div>
      <Typography variant="h4">Checkout</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="name"
          value={userInfo.name}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          value={userInfo.email}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="Dirección"
          name="address"
          value={userInfo.address}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Finalizar Compra
        </Button>
      </form>
    </div>
  );
};

export default Checkout;
