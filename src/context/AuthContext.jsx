import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { useCart } from "../context/CartContext";
import { updateProfile } from "firebase/auth";
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
  const register = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Aquí actualizamos el perfil con el nombre proporcionado
      await updateProfile(userCredential.user, {
        displayName: name, // Establece el nombre de usuario
      });
      setCurrentUser(userCredential.user);
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    }
  };
  const updateUser = async (user, name) => {
    try {
      await updateProfile(user, { displayName: name });
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };
  // Función para logout
  const logout = async () => {
    try {
      await signOut(auth); // Esperar a que se complete el cierre de sesión
      setCurrentUser(null); // Actualizar el estado de currentUser
      clearCart(); // Vaciar el carrito
      navigate("/"); // Redirigir al inicio
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
