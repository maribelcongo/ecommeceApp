import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Nuevo estado para el nombre
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, name); // Pasar el nombre al registro
      navigate("/"); // Redirigir después de registro exitoso
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: 2,
        maxWidth: "400px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        marginTop: "30px",
        gap: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#c55e82",
          fontWeight: "bold",
          textAlign: "center",
          fontFamily: "Skranji",
        }}
      >
        Registro
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": {
              fontFamily: "Skranji",
            },
            "& .MuiOutlinedInput-root": {
              fontFamily: "Skranji",
            },
          }}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": {
              fontFamily: "Skranji",
            },
            "& .MuiOutlinedInput-root": {
              fontFamily: "Skranji",
            },
          }}
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": {
              fontFamily: "Skranji",
            },
            "& .MuiOutlinedInput-root": {
              fontFamily: "Skranji",
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#c55e82",
            "&:hover": { backgroundColor: "#b04a6e" },
            fontFamily: "Skranji",
          }}
        >
          Registrar
        </Button>
      </form>
    </Box>
  );
};

export default Register;
