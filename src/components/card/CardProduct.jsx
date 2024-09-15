import React, { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
	CardActions,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getImageUrl } from "../../../firebase";
import "./CardProduct.css";

const CardProduct = ({ product }) => {
	const [imageUrl, setImageUrl] = useState("");

	useEffect(() => {
		const fetchImageUrl = async () => {
			try {
				const url = await getImageUrl(product.image);
				console.log("URL de la imagen obtenida:", url);
				setImageUrl(url);
			} catch (error) {
				console.error("Error al obtener la URL de la imagen:", error);
			}
		};

		fetchImageUrl();
	}, [product.image]);

	return (
		<div className="cardProductContainer">
			<Card className="cardProduct">
				<CardMedia
					component="img"
					className="cardProductMedia"
					height="140"
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
					<IconButton aria-label="add to cart">
						<ShoppingCartIcon />
					</IconButton>
				</CardActions>
			</Card>
		</div>
	);
};

export default CardProduct;
