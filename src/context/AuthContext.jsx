import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth"; // Asegúrate de importar signOut

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth); // Cierra sesión
        setCurrentUser(null); // Actualiza el estado del usuario
    };

    return (
        <AuthContext.Provider value={{ currentUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
