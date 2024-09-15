import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase"; // Importa  Firebase

const LoginForm = ({ onClose }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			onClose(); // Cierra el formulario después de iniciar sesión
		} catch (err) {
			setError("Credenciales inválidas. Por favor, intenta de nuevo.");
		}
	};

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ p: 3, maxWidth: 400 }}>
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
				Iniciar Sesión
			</Button>
		</Box>
	);
};

export default LoginForm;
