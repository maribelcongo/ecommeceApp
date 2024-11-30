import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
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
          gap: 2,
          backgroundColor: "background.paper",
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontFamily="Skranji"
          gutterBottom
        >
          Iniciar Sesión
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
        />
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
          Iniciar Sesión
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
