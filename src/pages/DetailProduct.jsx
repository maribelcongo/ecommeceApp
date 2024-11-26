import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getImageUrl } from "../../firebase";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useCart } from "../context/CartContext"; // Importar el contexto del carrito
import "./detailProduct.css";

const db = getFirestore();

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Obtener la función de agregar al carrito

  const fetchProductDetails = async (productId) => {
    try {
      const docRef = doc(db, "productos", productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const productData = docSnap.data();
        setProduct({
          id: productId,
          name: productData.name,
          price: productData.price,
          description: productData.description,
          image: productData.image,
          stock: productData.stock,
        });

        const url = await getImageUrl(productData.image);
        setImageUrl(url);
      } else {
        console.log("Producto no encontrado con ID:", productId);
        navigate("/not-found");
      }
    } catch (error) {
      console.error("Error al obtener los detalles del producto:", error);
      navigate("/not-found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const handleAddToCart = () => {
    const quantity = 1; // Suponiendo que la cantidad es 1, puedes modificarlo si es necesario
    addToCart(product, quantity);
  };

  return (
    <div className="detailProductContainer">
      <Card className="detailProductCard">
        <CardMedia
          component="img"
          height="300"
          image={imageUrl || "default-image-url"}
          alt={product.name || "Imagen del producto"}
        />
        <CardContent className="cardContent">
          <Typography variant="h4" component="div">
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h5" color="text.primary">
            ${product.price}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Stock: {product.stock} unidades disponibles
          </Typography>

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={handleAddToCart}
          >
            Añadir al carrito
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailProduct;
