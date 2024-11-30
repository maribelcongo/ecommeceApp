import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { useCart } from "../context/CartContext"; // Importar el contexto del carrito

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { clearCart } = useCart(); // Obtener la función para vaciar el carrito
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Este useEffect escucha los cambios de autenticación del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

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
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(userCredential.user);
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    }
  };

  // Función para logout
  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    clearCart();
    navigate("/");
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
