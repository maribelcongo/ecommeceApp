import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useCart } from "../context/CartContext";

import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCart(); // Obtén la función clearCart desde el contexto

  useEffect(() => {
    // Esta función se encargará de obtener los detalles de la orden desde Firestore
    const fetchOrderDetails = async () => {
      try {
        // Obtenemos la referencia al documento en la colección 'orders' con el 'orderId'
        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef); // Obtenemos los detalles de la orden

        // Verificamos si el documento existe
        if (orderSnap.exists()) {
          const data = orderSnap.data();
          // Aseguramos que todos los precios sean números y no cadenas
          data.products = data.products.map((product) => ({
            ...product,
            price: parseFloat(product.price), // Convertimos el precio a número
          }));
          setOrderDetails(data); // Establecemos los datos de la orden en el estado

          // Actualizamos el estado de la orden a "finalizada" en Firebase
          await updateDoc(orderRef, {
            status: "finalizada",
            completedAt: new Date(), // Fecha de finalización
          });

          clearCart(); // Vaciar el carrito cuando la orden se haya procesado
        } else {
          throw new Error("La orden no existe.");
        }
      } catch (error) {
        console.error("Error al obtener los detalles de la orden:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails(); // Llamamos la función para obtener los datos
  }, [orderId, clearCart]); // Dependemos de 'orderId' para volver a ejecutar el efecto

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
      <p>Productos comprados:</p>
      <ul>
        {orderDetails.products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span> -{" "}
            <span>
              {product.quantity} x ${product.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderConfirmation;
