import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para obtener los parámetros de la URL

const OrderConfirmation = () => {
  const { orderId } = useParams(); // Obtenemos el orderId desde la URL
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Aquí puedes hacer la llamada a la base de datos para obtener los detalles de la orden
    // Suponiendo que tienes una función que obtiene la orden por ID
    const fetchOrderDetails = async () => {
      try {
        // Reemplaza esto con la lógica de Firestore para obtener la orden
        const orderData = await fetchOrderById(orderId); // ejemplo de función para obtener los detalles
        setOrderDetails(orderData);
      } catch (error) {
        console.error("Error fetching order details", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]); // Se vuelve a ejecutar cuando el orderId cambia

  return (
    <div>
      {orderDetails ? (
        <div>
          <h1>Confirmación de Orden</h1>
          <p>Gracias por tu compra, {orderDetails.user.name}!</p>
          <p>Tu orden ID es: {orderId}</p>
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
      ) : (
        <p>Cargando detalles de la orden...</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
