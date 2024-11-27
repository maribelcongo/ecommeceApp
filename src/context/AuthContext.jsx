// import React, { createContext, useContext, useState, useEffect } from "react";
// import { auth } from "../../firebase";
// import { onAuthStateChanged, signOut } from "firebase/auth"; // Asegúrate de importar signOut

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setCurrentUser(user);
//         });
//         return () => unsubscribe();
//     }, []);

//     const logout = async () => {
//         await signOut(auth); // Cierra sesión
//         setCurrentUser(null); // Actualiza el estado del usuario
//     };

//     return (
//         <AuthContext.Provider value={{ currentUser, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase"; // Asegúrate de que tu archivo de configuración de Firebase esté correctamente importado
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Este useEffect escucha los cambios de autenticación del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe(); // Limpia el listener cuando el componente se desmonte
  }, []);

  // Función de login
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(userCredential.user); // Actualiza el estado con el usuario autenticado
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
      setCurrentUser(userCredential.user); // Actualiza el estado con el nuevo usuario registrado
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    }
  };

  // Función para logout
  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null); // Limpiar el estado cuando el usuario se cierra sesión
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
