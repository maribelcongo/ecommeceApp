import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      navigate("/");
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Asegura que el formulario esté centrado verticalmente
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 2, // Espaciado entre los elementos del formulario
          backgroundColor: "background.paper",
          borderRadius: "8px",
          boxShadow: 3, // Sombra para darle un poco de profundidad
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontFamily="Skranji"
          gutterBottom
        >
          Registrarse
        </Typography>
        {/* Campo de nombre */}
        <TextField
          label="Nombre"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          variant="outlined"
        />
        {/* Campo de email */}
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
        />
        {/* Campo de contraseña */}
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            padding: "12px 0",
            fontSize: "16px",
            fontWeight: "bold",
            background: "#c55e82",
          }}
        >
          Registrarse
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
