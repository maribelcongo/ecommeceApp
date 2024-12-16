import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getImageUrl } from "../../firebase";
import { updateDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import "./orderConfirmation.css";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCart();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          const data = orderSnap.data();

          // Obtener las URLs de las imágenes para cada producto
          data.products = await Promise.all(
            data.products.map(async (product) => {
              const imageUrl = await getImageUrl(product.image);
              return {
                ...product,
                imageUrl: imageUrl || "default-image-url",
                price: parseFloat(product.price),
              };
            })
          );

          setOrderDetails(data);

          // Actualizar el estado de la orden a "finalizada"
          await updateDoc(orderRef, {
            status: "finalizada",
            completedAt: new Date(),
          });

          clearCart(); // Vaciar el carrito
        } else {
          throw new Error("La orden no existe.");
        }
      } catch (error) {
        console.error("Error al obtener los detalles de la orden:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails(); // Llamada para obtener detalles de la orden
  }, [orderId, clearCart]);

  if (loading) {
    return (
      <div className="loadingMessage">Cargando detalles de la orden...</div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="errorMessage">
        No se encontraron detalles de la orden.
      </div>
    );
  }

  return (
    <div className="orderContent">
      <h1>Confirmación de Orden</h1>
      <p>¡Gracias por tu compra, {orderDetails.name}!</p>
      <p>
        Tu ID de orden es: <strong>{orderId}</strong>
      </p>
      <div className="totalAmount">Total: ${orderDetails.total}</div>
      <div className="productsSection">
        {orderDetails.products.map((product) => (
          <div key={product.id} className="productCard">
            <CardMedia
              component="img"
              sx={{ width: 100, height: 100, objectFit: "cover" }}
              image={product.imageUrl}
              alt={product.name}
            />
            <CardContent className="productDetails">
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1">
                {product.quantity} x ${product.price}
              </Typography>
            </CardContent>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderConfirmation;
