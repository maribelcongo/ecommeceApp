import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../firebase";
import "./cardProduct.css";

const CardProduct = ({ product }) => {
  const [imageUrl, setImageUrl] = useState("");

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
          <Typography className="cardProductPrice" variant="body1">
            ${product.price}
          </Typography>
        </CardContent>

        {/* Botón que redirige a la página de detalle */}
        <Link
          to={product.id ? `/product/${product.id}` : "#"}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#c55e82",
              "&:hover": { bgcolor: "#b04a6e" },
              color: "white",
              fontFamily: "Skranji, cursive",
              fontWeight: "bold",
              textTransform: "none",
              padding: "10px 20px",
              marginBottom: "10px",
            }}
          >
            Ver Detalles
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default CardProduct;
