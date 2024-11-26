import React, { createContext, useState, useContext, useEffect } from "react";

// Creamos el contexto
const CartContext = createContext();

// Función para obtener el carrito desde localStorage
const getCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

// Función para guardar el carrito en localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const CartProvider = ({ children }) => {
  // Intentamos obtener el carrito del localStorage al iniciar
  const [cart, setCart] = useState(getCartFromLocalStorage());

  // Esta función agrega un producto al carrito
  const addToCart = (product, quantity) => {
    const quantityNumber = Number(quantity);

    const updatedCart = [...cart, { ...product, quantity: quantityNumber }];

    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart); // Guardamos en localStorage
  };

  // Esta función elimina un producto del carrito
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);

    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart); // Guardamos en localStorage
  };

  // Al cambiar el carrito, guardamos el estado actualizado en localStorage
  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito
export const useCart = () => useContext(CartContext);
