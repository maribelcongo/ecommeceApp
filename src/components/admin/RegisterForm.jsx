import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase"; // Importa  Firebase

const RegisterForm = ({ onClose }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			onClose(); // Cierra el formulario después del registro
		} catch (err) {
			setError("Error al registrar. Por favor, intenta de nuevo.");
		}
	};

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ p: 3, maxWidth: 400 }}>
			 <TextField
                label="Nombre"
                fullWidth
                required
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
			<TextField
				label="Correo Electrónico"
				fullWidth
				required
				margin="normal"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextField
				label="Contraseña"
				fullWidth
				required
				margin="normal"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<Button
				type="submit"
				variant="contained"
				sx={{ mt: 2, bgcolor: "#c55e82" }}
			>
				Registrarse
			</Button>
		</Box>
	);
};

export default RegisterForm;
