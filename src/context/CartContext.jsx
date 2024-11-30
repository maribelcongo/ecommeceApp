import React, { createContext, useState, useContext, useEffect } from "react";
import { saveOrder } from "../../firebase"; // Importa la función para guardar la orden en Firestore

// Creamos el contexto
const CartContext = createContext();

// Función para obtener el carrito desde localStorage con manejo de errores
const getCartFromLocalStorage = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error al leer el carrito desde localStorage:", error);
    return [];
  }
};

// Función para guardar el carrito en localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error al guardar el carrito en localStorage:", error);
  }
};

export const CartProvider = ({ children }) => {
  // Intentamos obtener el carrito del localStorage al iniciar
  const [cart, setCart] = useState(getCartFromLocalStorage());

  // Esta función agrega un producto al carrito
  const addToCart = (product, quantity) => {
    const quantityNumber = Number(quantity);

    // Verificar si el producto ya existe en el carrito
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    let updatedCart;

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      const updatedProduct = {
        ...cart[existingProductIndex],
        quantity: cart[existingProductIndex].quantity + quantityNumber,
      };

      updatedCart = [
        ...cart.slice(0, existingProductIndex),
        updatedProduct,
        ...cart.slice(existingProductIndex + 1),
      ];
    } else {
      // Si no existe, agregar el producto al carrito
      updatedCart = [...cart, { ...product, quantity: quantityNumber }];
    }

    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart); // Guardamos en localStorage
  };

  // Esta función elimina un producto del carrito
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart); // Guardamos en localStorage
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (productId, change) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) } // Aseguramos que la cantidad no baje de 1
        : item
    );
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart); // Guardamos en localStorage
  };

  // Esta función vacía el carrito
  const clearCart = () => {
    setCart([]); // Limpiar el estado de React
    localStorage.removeItem("cart"); // Eliminar el carrito del localStorage
  };

  // Función de checkout para finalizar la compra
  const checkout = async (userInfo) => {
    try {
      // Crear la orden con la información del usuario y el carrito
      const orderDetails = {
        userId: userInfo.id, // ID del usuario (suponiendo que ya lo tienes)
        name: userInfo.name,
        email: userInfo.email,
        address: userInfo.address,
        products: cart, // Productos del carrito
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0), // Total de la compra
        createdAt: new Date(), // Fecha de la compra
      };

      // Guarda la orden en Firestore
      const orderId = await saveOrder(orderDetails);

      if (orderId) {
        // Limpiar el carrito después de la compra
        clearCart();
      }

      return orderId; // Retorna el ID de la orden guardada
    } catch (error) {
      console.error("Error al crear la orden:", error);
      return null; // Retorna null si ocurre un error
    }
  };

  // Al cambiar el carrito, guardamos el estado actualizado en localStorage
  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito
export const useCart = () => useContext(CartContext);
// -------------------------------------------------------------------------------------------------
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { saveOrder } from "../../firebase";

// const CartContext = createContext();

// const getCartFromLocalStorage = () => {
//   try {
//     const storedCart = localStorage.getItem("cart");
//     return storedCart ? JSON.parse(storedCart) : [];
//   } catch (error) {
//     console.error("Error al leer el carrito desde localStorage:", error);
//     return [];
//   }
// };

// const saveCartToLocalStorage = (cart) => {
//   try {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   } catch (error) {
//     console.error("Error al guardar el carrito en localStorage:", error);
//   }
// };

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState(getCartFromLocalStorage());

//   const addToCart = (product, quantity) => {
//     const quantityNumber = Number(quantity);
//     const existingProductIndex = cart.findIndex(
//       (item) => item.id === product.id
//     );
//     let updatedCart;

//     if (existingProductIndex !== -1) {
//       const updatedProduct = {
//         ...cart[existingProductIndex],
//         quantity: cart[existingProductIndex].quantity + quantityNumber,
//       };

//       updatedCart = [
//         ...cart.slice(0, existingProductIndex),
//         updatedProduct,
//         ...cart.slice(existingProductIndex + 1),
//       ];
//     } else {
//       updatedCart = [...cart, { ...product, quantity: quantityNumber }];
//     }

//     setCart(updatedCart);
//     saveCartToLocalStorage(updatedCart);
//   };

//   const removeFromCart = (productId) => {
//     const updatedCart = cart.filter((item) => item.id !== productId);
//     setCart(updatedCart);
//     saveCartToLocalStorage(updatedCart);
//   };

//   const updateQuantity = (productId, change) => {
//     const updatedCart = cart.map((item) =>
//       item.id === productId
//         ? { ...item, quantity: Math.max(1, item.quantity + change) }
//         : item
//     );
//     setCart(updatedCart);
//     saveCartToLocalStorage(updatedCart);
//   };

//   const clearCart = () => {
//     setCart([]); // Limpiar el carrito en el estado
//     localStorage.removeItem("cart"); // Eliminar el carrito de localStorage
//   };

//   const checkout = async (userInfo) => {
//     try {
//       const orderDetails = {
//         userId: userInfo.id,
//         name: userInfo.name,
//         email: userInfo.email,
//         address: userInfo.address,
//         products: cart,
//         total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
//         createdAt: new Date(),
//       };

//       const orderId = await saveOrder(orderDetails);
//       if (orderId) {
//         clearCart();
//       }

//       return orderId;
//     } catch (error) {
//       console.error("Error al crear la orden:", error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     saveCartToLocalStorage(cart);
//   }, [cart]);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         checkout,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
