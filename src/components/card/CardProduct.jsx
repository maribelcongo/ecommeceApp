

import React, { useEffect, useState } from "react"; 
import {
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
    CardActions,
    Dialog,
    TextField,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getImageUrl } from "../../../firebase";
import { useCart } from "../../context/CartContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";  // Importar la autenticación de Firebase
import "./cardProduct.css";

const CardProduct = ({ product }) => {
    const [imageUrl, setImageUrl] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);   // Modal para agregar al carrito
    const [openAuthModal, setOpenAuthModal] = useState(false);  // Modal para el mensaje de autenticación
    const [user, setUser] = useState(null); // Estado para el usuario autenticado
    const { addToCart } = useCart();
    const auth = getAuth(); // Obtener instancia de autenticación

    // Actualizar la información del usuario al iniciar o cerrar sesión
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Actualizar el estado con el usuario actual (o null si se ha cerrado sesión)
        });
        
        return () => unsubscribe(); 
    }, [auth]);

    // Obtener la URL de la imagen del producto
    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const url = await getImageUrl(product.image);
                setImageUrl(url);
            } catch (error) {
                console.error("Error al obtener la URL de la imagen:", error);
            }
        };

        fetchImageUrl();
    }, [product.image]);

    const handleOpen = () => {
        if (user) {
            setOpen(true); // Si el usuario está autenticado, abrir el modal de carrito
        } else {
            setOpenAuthModal(true); // Si no está autenticado, abrir el modal de autenticación
        }
    };

    const handleClose = () => setOpen(false);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        handleClose();
    };

    const handleAuthModalClose = () => setOpenAuthModal(false);

    return (
        <div className="containerProductCard">
            <Card className="cardProduct">
                <CardMedia
                    component="img"
                    className="ProductMediaCard"
                    height="200"
                    image={imageUrl || "default-image-url"}
                    alt={product.name || "Imagen del producto"}
                />
                <CardContent className="cardProductContent">
                    <Typography
                        className="cardProductTitle"
                        gutterBottom
                        variant="h5"
                        component="div"
                    >
                        {product.name}
                    </Typography>
                    <Typography className="cardProductDescription" variant="body2">
                        {product.description}
                    </Typography>
                    <Typography className="cardProductPrice" variant="body1">
                        ${product.price}
                    </Typography>
                    <Typography className="cardProductStock" variant="body2">
                        Stock: {product.stock}
                    </Typography>
                </CardContent>
                <CardActions className="cardProductActions">
                    <IconButton aria-label="add to cart" onClick={handleOpen}>
                        <ShoppingCartIcon />
                    </IconButton>
                </CardActions>
            </Card>

            {/* Modal para agregar al carrito */}
            <Dialog open={open} onClose={handleClose}>
                <div style={{ padding: "20px", textAlign: "center" }} className="modal-add">
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: "Skranji, cursive", 
                            fontSize: "1.5rem", 
                            color: "#c55e82",
                            fontWeight: "bold", 
                            marginBottom: "20px", 
                            textAlign: "center" 
                        }}
                    >
                        Cantidad
                    </Typography>

                    <TextField
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        InputProps={{
                            inputProps: { min: 1, max: product.stock }, 
                        }}
                        sx={{
                            marginBottom: "20px", 
                            width: "100%", 
                            "& .MuiInputBase-root": {
                                fontFamily: "Skranji, cursive", 
                            }
                        }}
                    />

                    <Button
                        onClick={handleAddToCart}
                        variant="contained"
                        sx={{
                            bgcolor: "#c55e82", 
                            "&:hover": {
                                bgcolor: "#b04a6e"
                            },
                            color: "white",
                            fontFamily: "Skranji, cursive", 
                            fontWeight: "bold", 
                            textTransform: "none", 
                            padding: "10px 20px", 
                        }}
                    >
                        Agregar al Carrito
                    </Button>
                </div>
            </Dialog>

            {/* Modal para registro o inicio de sesión */}
            <Dialog open={openAuthModal} onClose={handleAuthModalClose}>
                <DialogTitle
                    sx={{
                        color: "#c55e82", 
                        fontWeight: "bold", 
                        textAlign: "center",
                        fontFamily: "Skranji, cursive", 
                        fontSize: "1.8rem" 
                    }}
                >
                    ENCANTADA
                </DialogTitle>

                <DialogContent>
                    <Typography
                        sx={{
                            textAlign: "center", 
                            fontFamily: "Skranji, cursive", 
                            fontSize: "1.2rem",
                            marginTop: "15px",
                            color: "#333" 
                        }}
                    >
                        Regístrate o inicia sesión para agregar productos al carrito.
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button
                        onClick={handleAuthModalClose}
                        variant="contained"
                        sx={{
                            bgcolor: "#c55e82", 
                            "&:hover": {
                                bgcolor: "#b04a6e" 
                            },
                            color: "white", 
                            fontFamily: "Skranji, cursive", 
                            fontWeight: "bold" 
                        }}
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default CardProduct;
