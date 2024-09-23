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
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getImageUrl } from "../../../firebase";
import { useCart } from "../../context/CartContext";
import "./cardProduct.css";

const CardProduct = ({ product }) => {
	const [imageUrl, setImageUrl] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [open, setOpen] = useState(false);
	const { addToCart } = useCart();

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

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleAddToCart = () => {
		addToCart(product, quantity);
		handleClose();
	};

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
				<div style={{ padding: "20px" }}>
					<Typography variant="h6">Cantidad</Typography>
					<TextField
						type="number"
						value={quantity}
						onChange={(e) => setQuantity(Number(e.target.value))}
						InputProps={{ inputProps: { min: 1 } }}
					/>
					<Button onClick={handleAddToCart} variant="contained" color="primary">
						Agregar al Carrito
					</Button>
				</div>
			</Dialog>
		</div>
	);
};

export default CardProduct;
