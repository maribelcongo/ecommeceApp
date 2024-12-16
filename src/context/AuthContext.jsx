import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
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
    // Asegurarse de que la persistencia esté configurada en local
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Suscribir al evento de cambio de estado de autenticación
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setCurrentUser(user); // El usuario está autenticado
          } else {
            setCurrentUser(null); // El usuario no está autenticado
          }
        });
        return unsubscribe;
      })
      .catch((error) => {
        console.error("Error al establecer persistencia:", error);
      });
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
      await updateProfile(userCredential.user, { displayName: name });
      setCurrentUser(userCredential.user);
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    }
  };

  // Función de logout
  const logout = async () => {
    try {
      await signOut(auth); // Cerrar sesión
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
