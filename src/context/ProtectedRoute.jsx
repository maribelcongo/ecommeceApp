import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importamos el hook de autenticación

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Usamos el estado de usuario del contexto

  if (!currentUser) {
    // Si el usuario no está autenticado, redirigimos a la página de login
    return <Navigate to="/login" />;
  }

  return children; // Si está autenticado, renderizamos los componentes hijos (la ruta protegida)
};

export default ProtectedRoute;
