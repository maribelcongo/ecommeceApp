import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { clearCart } = useCart();
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // useEffect para escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // useEffect para redirigir al inicio cuando no hay usuario
  useEffect(() => {
    if (!currentUser) {
      navigate("/"); // Redirigir al inicio si no hay un usuario
    }
  }, [currentUser, navigate]);

  // Función de login
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(userCredential.user);
    } catch (error) {
      console.error("Error en el login:", error);
      throw error;
    }
  };

  // Función de registro
  const register = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Actualizamos el perfil con el nombre
      await updateProfile(user, {
        displayName: name,
      });

      setCurrentUser(user);
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    }
  };

  // Función para logout
  const logout = async () => {
    try {
      await signOut(auth); // Cerrar sesión
      setCurrentUser(null); // Actualizar el estado a null
      clearCart(); // Vaciar el carrito
      navigate("/"); // Redirigir al inicio después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
