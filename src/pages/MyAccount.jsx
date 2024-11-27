// import React from "react";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const MyAccount = () => {
//   const { currentUser, logout } = useAuth();
//   const { cart } = useCart();
//   const navigate = useNavigate();

//   // Redirigir si el usuario no está autenticado
//   if (!currentUser) {
//     navigate("/login");
//     return null;
//   }

//   // Lógica para manejar el cierre de sesión
//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login"); // Redirigir a la página de inicio de sesión
//     } catch (error) {
//       console.error("Error al cerrar sesión:", error);
//     }
//   };

//   // Función para cerrar el formulario y redirigir
//   const handleClose = () => {
//     navigate("/"); // Redirigir a la página de inicio u otra ruta
//   };

//   // Calcular el total del carrito, asegurándonos de que el precio sea un número
//   const total = cart.reduce((acc, item) => {
//     const price = Number(item.price) || 0;
//     return acc + price * item.quantity;
//   }, 0);

//   return (
//     <Box
//       sx={{
//         p: 3,
//         backgroundColor: "#f5f5f5",
//         borderRadius: "8px",
//         boxShadow: 2,
//       }}
//     >
//       <Typography
//         variant="h4"
//         sx={{ color: "#c55e82", fontWeight: "bold", mb: 2 }}
//       >
//         Mi Cuenta
//       </Typography>
//       <Typography variant="h6">
//         Nombre: {currentUser.displayName || currentUser.email}
//       </Typography>
//       <Typography variant="h6">Email: {currentUser.email}</Typography>

//       {cart.length > 0 ? (
//         <>
//           <Typography variant="h6">
//             Tienes {cart.length} productos en tu carrito.
//           </Typography>
//           <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>

//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
//             {cart.map((item, index) => (
//               <Card
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   padding: 2,
//                   borderRadius: "8px",
//                   boxShadow: 1,
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   sx={{ width: 100, height: 100, borderRadius: "4px" }}
//                   image={item.image}
//                   alt={item.name}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                     {item.name}
//                   </Typography>
//                   <Typography variant="body1">
//                     ${(Number(item.price) || 0).toFixed(2)}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             ))}
//           </Box>
//         </>
//       ) : (
//         <Typography variant="h6">Tu carrito está vacío.</Typography>
//       )}

//       {/* Botón para cerrar el formulario */}
//       <Button
//         variant="outlined"
//         sx={{
//           mt: 2,
//           ml: 2,
//           borderColor: "#c55e82",
//           color: "#c55e82",
//           "&:hover": { borderColor: "#b04a6e", color: "#b04a6e" },
//         }}
//         onClick={handleClose}
//       >
//         Cerrar
//       </Button>
//     </Box>
//   );
// };

// export default MyAccount;
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase"; // Asegúrate de tener Firebase configurado
import { collection, query, where, getDocs } from "firebase/firestore";

const MyAccount = () => {
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirigir si el usuario no está autenticado
  if (!currentUser) {
    navigate("/login");
    return null;
  }

  // Lógica para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirigir a la página de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Función para cerrar el formulario y redirigir
  const handleClose = () => {
    navigate("/"); // Redirigir a la página de inicio u otra ruta
  };

  // Obtener las órdenes de Firebase
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const ordersCollection = collection(db, "orders");
      const q = query(ordersCollection, where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      const fetchedOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
      setLoading(false);
    };

    fetchOrders();
  }, [currentUser.uid]);

  // Calcular el total del carrito, asegurándonos de que el precio sea un número
  const total = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    return acc + price * item.quantity;
  }, 0);

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "#c55e82", fontWeight: "bold", mb: 2 }}
      >
        Mi Cuenta
      </Typography>
      <Typography variant="h6">
        Nombre: {currentUser.displayName || currentUser.email}
      </Typography>
      <Typography variant="h6">Email: {currentUser.email}</Typography>

      {cart.length > 0 ? (
        <>
          <Typography variant="h6">
            Tienes {cart.length} productos en tu carrito.
          </Typography>
          <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            {cart.map((item, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  borderRadius: "8px",
                  boxShadow: 1,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 100, height: 100, borderRadius: "4px" }}
                  image={item.image}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body1">
                    ${(Number(item.price) || 0).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      ) : (
        <Typography variant="h6">Tu carrito está vacío.</Typography>
      )}

      {/* Botón para ver las órdenes */}
      <Button
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "#c55e82",
          "&:hover": { backgroundColor: "#b04a6e" },
        }}
        onClick={() => navigate("/ordenes")}
      >
        Ver mis órdenes
      </Button>

      {/* Mostrar las órdenes finalizadas y pendientes */}
      <Box sx={{ mt: 3 }}>
        {loading ? (
          <Typography>Cargando tus órdenes...</Typography>
        ) : (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Mis Órdenes
            </Typography>
            {orders.length === 0 ? (
              <Typography>No tienes órdenes aún.</Typography>
            ) : (
              orders.map((order) => (
                <Card
                  key={order.id}
                  sx={{
                    marginBottom: 2,
                    padding: 2,
                    backgroundColor:
                      order.status === "completed" ? "#e8f5e9" : "#fff3e0",
                    borderRadius: "8px",
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Orden ID: {order.id}
                  </Typography>
                  <Typography variant="body1">
                    Estado:{" "}
                    {order.status === "completed" ? "Completada" : "Pendiente"}
                  </Typography>
                  <Typography variant="body1">
                    Fecha: {order.date.toDate().toLocaleDateString()}
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    {order.products.map((product, index) => (
                      <Typography key={index} variant="body2">
                        {product.name} - $
                        {(Number(product.price) || 0).toFixed(2)} x{" "}
                        {product.quantity}
                      </Typography>
                    ))}
                  </Box>
                </Card>
              ))
            )}
          </>
        )}
      </Box>

      {/* Botón para cerrar el formulario */}
      <Button
        variant="outlined"
        sx={{
          mt: 2,
          ml: 2,
          borderColor: "#c55e82",
          color: "#c55e82",
          "&:hover": { borderColor: "#b04a6e", color: "#b04a6e" },
        }}
        onClick={handleLogout}
      >
        Cerrar sesión
      </Button>
    </Box>
  );
};

export default MyAccount;
