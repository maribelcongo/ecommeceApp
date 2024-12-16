import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Si no hay usuario logueado, redirige a login
    if (!currentUser) {
      navigate("/login");
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
        const fetchedOrders = querySnapshot.docs.map((doc) => {
          const orderData = doc.data();

          // Aseguramos que createdAt sea un Timestamp válido
          const createdAt =
            orderData.createdAt && orderData.createdAt.seconds
              ? new Date(orderData.createdAt.seconds * 1000)
              : null;

          return {
            id: doc.id,
            ...orderData,
            status: "finalizada",
            createdAt: createdAt,
          };
        });
        setOrders(fetchedOrders);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "70%" },
        margin: "auto",
        marginTop: "30px",
        padding: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#c55e82",
          fontWeight: "bold",
          mb: 2,
          fontFamily: "Skranji, sans-serif",
        }}
      >
        Mis Órdenes
      </Typography>

      {loading ? (
        <Typography variant="h6" sx={{ color: "#555" }}>
          Cargando tus órdenes...
        </Typography>
      ) : orders.length === 0 ? (
        <Box>
          <Typography variant="h6" sx={{ color: "#888", marginBottom: 2 }}>
            No tienes órdenes realizadas aún.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#c55e82",
              "&:hover": { backgroundColor: "#b04a6e" },
              marginTop: 2,
              padding: "10px 20px",
              textTransform: "none",
            }}
            onClick={() => navigate("/")}
          >
            Ir a la tienda
          </Button>
        </Box>
      ) : (
        <Box>
          {orders.map((order) => (
            <Card key={order.id} sx={{ marginBottom: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Orden ID: {order.id}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  Estado:{" "}
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    Finalizada
                  </span>
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  Total: ${order.total}
                </Typography>

                {/* Aseguramos que createdAt esté presente y sea válido */}
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  Fecha:{" "}
                  {order.createdAt
                    ? order.createdAt.toLocaleDateString()
                    : "Fecha no disponible"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MyOrders;
