import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Agregamos useHistory para redirigir después de la confirmación
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Asegúrate de que esto esté apuntando correctamente a tu archivo de configuración de Firebase
import { useCart } from "../context/CartContext"; // Importamos el contexto de carrito

const OrderConfirmation = () => {
  const { orderId } = useParams(); // Obtén el orderId desde la URL
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
          clearCart(); // Vaciar el carrito cuando la orden se haya procesado
        } else {
          throw new Error("La orden no existe.");
        }
      } catch (error) {
        console.error("Error al obtener los detalles de la orden:", error);
      } finally {
        setLoading(false); // Terminamos el proceso de carga, independientemente de si fue exitoso o no
      }
    };

    fetchOrderDetails(); // Llamamos la función para obtener los datos
  }, [orderId, clearCart]); // Dependemos de 'orderId' para volver a ejecutar el efecto

  if (loading) {
    return <div>Cargando detalles de la orden...</div>;
  }

  if (!orderDetails) {
    return <div>No se encontraron detalles de la orden.</div>;
  }

  return (
    <div className="orderContent">
      <h1>Confirmación de Orden</h1>
      <p>¡Gracias por tu compra, {orderDetails.name}!</p>
      <p>Tu ID de orden es: {orderId}</p>
      <p>Total: ${orderDetails.total}</p>
      <p>Productos comprados:</p>
      <ul>
        {orderDetails.products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.quantity} x ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderConfirmation;
