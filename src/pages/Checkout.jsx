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
