// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUT_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID,
// };

// // Inicializamos Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Exportar las funciones necesarias
// export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const storage = getStorage(app); // Inicializar el almacenamiento

// // Función para obtener la URL de la imagen desde Firebase Storage
// export const getImageUrl = async (imagePath) => {
//   try {
//     const imageRef = ref(storage, imagePath);
//     const url = await getDownloadURL(imageRef);
//     return url;
//   } catch (error) {
//     console.error("Error al obtener la URL de la imagen:", error);
//     return "";
//   }
// };

// // Función para guardar la orden en la colección "orders"
// export const saveOrder = async (orderDetails) => {
//   try {
//     const ordersCollection = collection(db, "orders");
//     const docRef = await addDoc(ordersCollection, orderDetails); // Guardar en la colección 'orders'
//     console.log("Orden guardada con ID: ", docRef.id);
//     return docRef.id; // Devuelve el ID del documento creado
//   } catch (error) {
//     console.error("Error al guardar la orden:", error);
//     throw new Error("Error al guardar la orden");
//   }
// };
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUT_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exportación de servicios necesarios
export const db = getFirestore(app);
export const auth = getAuth(app); // Para autenticar usuarios
export const storage = getStorage(app); // Para almacenamiento

// Función para obtener la URL de la imagen desde Firebase Storage
export const getImageUrl = async (imagePath) => {
  try {
    const imageRef = ref(storage, imagePath);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error al obtener la URL de la imagen:", error);
    return "";
  }
};

// Función para guardar la orden en la colección "orders"
export const saveOrder = async (orderDetails) => {
  try {
    // Validar que los detalles de la orden sean correctos
    if (
      !orderDetails.name ||
      !orderDetails.email ||
      !orderDetails.address ||
      !orderDetails.products ||
      orderDetails.products.length === 0
    ) {
      throw new Error(
        "Faltan datos importantes en la orden (name, email, address, products)."
      );
    }

    // Obtener el ID del usuario autenticado
    const user = auth.currentUser;
    const userId = user ? user.uid : null; // Si el usuario está autenticado, obtenemos su ID

    if (userId) {
      orderDetails.userId = userId; // Agregar el ID del usuario a los detalles de la orden
    } else {
      console.warn(
        "El usuario no está autenticado. La orden se guarda sin un ID de usuario."
      );
    }

    const ordersCollection = collection(db, "orders");
    const docRef = await addDoc(ordersCollection, orderDetails); // Guardar en la colección 'orders'
    console.log("Orden guardada con ID:", docRef.id);
    return docRef.id; // Devuelve el ID del documento creado
  } catch (error) {
    console.error("Error al guardar la orden:", error);
    throw new Error("Error al guardar la orden");
  }
};
