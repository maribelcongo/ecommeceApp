
import React from "react"; 
import { useAuth } from "../context/AuthContext"; 
import { useCart } from "../context/CartContext"; 
import { Box, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
    const { currentUser, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    // Redirigir si el usuario no está autenticado
    if (!currentUser) {
        navigate("/login");
        return null; 
    }

    // Lógica para manejar el cierre de sesión
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login"); // Redirigir a la página de inicio de sesión
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    // Función para cerrar el formulario y redirigir
    const handleClose = () => {
        navigate("/"); // Redirigir a la página de inicio u otra ruta
    };

    // Calcular el total del carrito
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4">Mi Cuenta</Typography>
            <Typography variant="h6">Nombre: {currentUser.displayName || currentUser.email}</Typography>
            <Typography variant="h6">Email: {currentUser.email}</Typography>
            
            {cart.length > 0 ? (
                <>
                    <Typography variant="h6">Tienes {cart.length} productos en tu carrito.</Typography>
                    <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        {cart.map((item, index) => (
                            <Card key={index} sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 100, height: 100 }}
                                    image={item.image} // Asegúrate de que 'image' sea la propiedad correcta
                                    alt={item.name}
                                />
                                <CardContent>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body1">${item.price.toFixed(2)}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </>
            ) : (
                <Typography variant="h6">Tu carrito está vacío.</Typography>
            )}

         

    

            {/* Botón para cerrar el formulario */}
            <Button 
                variant="outlined" 
                color="primary" 
                sx={{ mt: 2, ml: 2 }} 
                onClick={handleClose}
            >
                Cerrar
            </Button>
        </Box>
    );
};

export default MyAccount;
