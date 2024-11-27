import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
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
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">Registrarse</Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        {/* Campo de nombre */}
        <TextField
          label="Nombre"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginBottom: "20px" }}
        />
        {/* Campo de email */}
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Campo de contraseña */}
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginTop: "20px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Registrarse
        </Button>
      </form>
    </div>
  );
};

export default Register;
