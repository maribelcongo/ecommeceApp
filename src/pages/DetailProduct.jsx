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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./detailProduct.css";

const db = getFirestore();

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();

  const [openModal, setOpenModal] = useState(false);

  // Obtener los detalles del producto
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
      navigate("/not-found"); // Redirigir en caso de error
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

  // Manejar la acción de agregar al carrito
  const handleAddToCart = () => {
    if (currentUser) {
      const quantity = 1;
      addToCart(product, quantity);
      navigate("/");
    } else {
      setOpenModal(true);
    }
  };

  // Manejar el cierre del modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Manejar la redirección al login
  const handleLoginRedirect = () => {
    navigate("/login");
    setOpenModal(false);
  };

  // Manejar la redirección al registro
  const handleRegisterRedirect = () => {
    navigate("/register");
    setOpenModal(false);
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

      {/* Modal para usuario no autenticado */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Inicia sesión o regístrate</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Para añadir productos al carrito, necesitas iniciar sesión o
            registrarte.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginRedirect} color="primary">
            Iniciar sesión
          </Button>
          <Button onClick={handleRegisterRedirect} color="primary">
            Registrarse
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DetailProduct;
