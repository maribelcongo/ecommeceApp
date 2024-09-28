import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile, getAuth } from "firebase/auth";
import { auth } from "../../../firebase"; // Importa tu instancia de Firebase

const RegisterForm = ({ onClose }) => {
    // Estados para cada campo
    const [name, setName] = useState(""); // Estado para el nombre
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reinicia el error antes de intentar registrar
        try {
            // Crea el usuario en Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Actualiza el perfil del usuario con el nombre
            await updateProfile(user, { displayName: name });

            // Cierra el formulario después del registro
            onClose();
        } catch (err) {
            // Manejo de errores
            setError(err.message); // Muestra el mensaje de error específico
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, maxWidth: 400 }}>
            {/* Campo para el nombre */}
            <TextField
                label="Nombre"
                fullWidth
                required
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            {/* Campo para el correo electrónico */}
            <TextField
                label="Correo Electrónico"
                fullWidth
                required
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            {/* Campo para la contraseña */}
            <TextField
                label="Contraseña"
                fullWidth
                required
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* Mostrar error en caso de que ocurra */}
            {error && <p style={{ color: "red" }}>{error}</p>}

		<ul inert>
             <li role="menuitem">
            <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: "#c55e82" }}>
            Registrarse
            </Button>
              </li>
        </ul>

        </Box>
    );
};

export default RegisterForm;
