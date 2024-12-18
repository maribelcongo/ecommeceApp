// import React, { useState, useEffect } from "react";
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
// import { db } from "../../firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const MyAccount = () => {
//   const { currentUser } = useAuth();
//   const { cart } = useCart();
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Verificar si currentUser está presente antes de continuar
//   useEffect(() => {
//     if (!currentUser) {
//       navigate("/"); // Redirigir si no hay usuario logueado
//     }
//   }, [currentUser, navigate]);

//   // Obtener las órdenes de Firebase
//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (currentUser) {
//         setLoading(true);
//         const ordersCollection = collection(db, "orders");
//         const q = query(
//           ordersCollection,
//           where("userId", "==", currentUser.uid)
//         );
//         const querySnapshot = await getDocs(q);
//         const fetchedOrders = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setOrders(fetchedOrders);
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [currentUser]);

//   // Calcular el total del carrito
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
//         display: "flex",
//         flexDirection: { xs: "column", sm: "row" },
//         gap: 4,
//       }}
//     >
//       {/* Sección de datos de usuario */}
//       <Box
//         sx={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           maxHeight: "300px",
//           overflowY: "auto",
//         }}
//       >
//         <Typography
//           variant="h4"
//           sx={{
//             color: "#c55e82",
//             fontWeight: "bold",
//             mb: 2,
//             fontFamily: "Skranji",
//           }}
//         >
//           Mi Cuenta
//         </Typography>

//         {/* Verificar si currentUser es null o no */}
//         {currentUser ? (
//           <>
//             <Typography variant="h6" sx={{ fontFamily: "Skranji" }}>
//               Nombre: {currentUser ? currentUser.displayName : "No disponible"}
//             </Typography>
//             <Typography variant="h6" sx={{ fontFamily: "Skranji" }}>
//               Email: {currentUser.email}
//             </Typography>
//           </>
//         ) : (
//           <Typography variant="h6" sx={{ fontFamily: "Skranji" }}>
//             No se ha iniciado sesión.
//           </Typography>
//         )}

//         <Box sx={{ mt: 2 }}>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#c55e82",
//               "&:hover": { backgroundColor: "#b04a6e" },
//             }}
//             onClick={() => navigate("/ordenes")}
//           >
//             Ver mis órdenes
//           </Button>
//         </Box>
//       </Box>

//       {/* Sección de carrito */}
//       <Box sx={{ flex: 1 }}>
//         <Typography
//           variant="h4"
//           sx={{
//             color: "#c55e82",
//             fontWeight: "bold",
//             mb: 2,
//             fontFamily: "Skranji",
//           }}
//         >
//           Mi Carrito
//         </Typography>

//         {cart.length > 0 ? (
//           <>
//             <Typography variant="h6" sx={{ fontFamily: "Skranji" }}>
//               Tienes {cart.length} productos en tu carrito.
//             </Typography>

//             {/* Muestra las imágenes de los productos en el carrito */}
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 2,
//                 mt: 2,
//               }}
//             >
//               {cart.map((item, index) => (
//                 <Card
//                   key={index}
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     padding: 2,
//                     borderRadius: "8px",
//                     boxShadow: 1,
//                   }}
//                 >
//                   <CardMedia
//                     component="img"
//                     sx={{ width: 100, height: 100, borderRadius: "4px" }}
//                     image={item.image}
//                     alt={item.name}
//                   />
//                   <CardContent>
//                     <Typography
//                       variant="h6"
//                       sx={{ fontWeight: "bold", fontFamily: "Skranji" }}
//                     >
//                       {item.name}
//                     </Typography>
//                     <Typography variant="body1" sx={{ fontFamily: "Skranji" }}>
//                       ${(Number(item.price) || 0).toFixed(2)}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               ))}
//             </Box>

//             {/* Total del carrito */}
//             <Typography
//               variant="h6"
//               sx={{ fontWeight: "bold", mt: 2, fontFamily: "Skranji" }}
//             >
//               Total: ${total.toFixed(2)}
//             </Typography>
//           </>
//         ) : (
//           <Typography variant="h6" sx={{ fontFamily: "Skranji" }}>
//             Tu carrito está vacío.
//           </Typography>
//         )}
//       </Box>
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
  TextField,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { updateProfile } from "firebase/auth"; // Importar updateProfile

const MyAccount = () => {
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // Estado para manejar la edición del nombre
  const [name, setName] = useState(currentUser?.displayName || ""); // Estado para el nombre

  // Verificar si currentUser está presente antes de continuar
  useEffect(() => {
    if (!currentUser) {
      navigate("/"); // Redirigir si no hay usuario logueado
    }
  }, [currentUser, navigate]);

  // Obtener las órdenes de Firebase
  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser) {
        setLoading(true);
        const ordersCollection = collection(db, "orders");
        const q = query(
          ordersCollection,
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  // Calcular el total del carrito
  const total = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    return acc + price * item.quantity;
  }, 0);

  // Función para guardar el nombre editado
  const handleSaveName = async () => {
    setLoading(true);
    try {
      await updateProfile(currentUser, { displayName: name }); // Actualiza el nombre en el perfil de Firebase
      setEditMode(false); // Desactivar el modo de edición después de guardar
    } catch (error) {
      console.error("Error al actualizar el nombre:", error);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 4,
      }}
    >
      {/* Sección de datos de usuario */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#c55e82",
            fontWeight: "bold",
            mb: 2,
            fontFamily: "Skranji",
          }}
        >
          Mi Cuenta
        </Typography>

        {/* Sección de nombre editable */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" sx={{ fontFamily: "Skranji" }}>
            Nombre:{" "}
          </Typography>
          {editMode ? (
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ flex: 1 }}
            />
          ) : (
            <Typography variant="h6" sx={{ fontFamily: "Skranji", flex: 1 }}>
              {currentUser?.displayName || "No disponible"}
            </Typography>
          )}
          <IconButton
            onClick={() => setEditMode(!editMode)}
            sx={{ color: "#c55e82" }}
          >
            <Edit />
          </IconButton>
        </Box>

        {/* Si el nombre está siendo editado, mostramos el botón de guardar */}
        {editMode && (
          <Button
            variant="contained"
            onClick={handleSaveName}
            disabled={loading}
            sx={{
              backgroundColor: "#c55e82",
              "&:hover": { backgroundColor: "#b04a6e" },
              mt: 2,
            }}
          >
            {loading ? "Guardando..." : "Guardar Nombre"}
          </Button>
        )}

        {/* Datos del usuario */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ fontFamily: "Skranji" }}>
            Email: {currentUser?.email}
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#c55e82",
              "&:hover": { backgroundColor: "#b04a6e" },
            }}
            onClick={() => navigate("/ordenes")}
          >
            Ver mis órdenes
          </Button>
        </Box>
      </Box>

      {/* Sección de carrito */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h4"
          sx={{
            color: "#c55e82",
            fontWeight: "bold",
            mb: 2,
            fontFamily: "Skranji",
          }}
        >
          Mi Carrito
        </Typography>

        {cart.length > 0 ? (
          <>
            <Typography variant="h6" sx={{ fontFamily: "Skranji" }}>
              Tienes {cart.length} productos en tu carrito.
            </Typography>

            {/* Muestra las imágenes de los productos en el carrito */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 2,
              }}
            >
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
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", fontFamily: "Skranji" }}
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: "Skranji" }}>
                      ${(Number(item.price) || 0).toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Total del carrito */}
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mt: 2, fontFamily: "Skranji" }}
            >
              Total: ${total.toFixed(2)}
            </Typography>
          </>
        ) : (
          <Typography variant="h6" sx={{ fontFamily: "Skranji" }}>
            Tu carrito está vacío.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MyAccount;
