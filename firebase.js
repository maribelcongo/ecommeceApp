// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
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

// // Función para obtener la URL de una imagen desde Firebase Storage
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
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUT_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exportar las funciones necesarias
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // Inicializar el almacenamiento

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
    const ordersCollection = collection(db, "orders");
    const docRef = await addDoc(ordersCollection, orderDetails); // Guardar en la colección 'orders'
    console.log("Orden guardada con ID: ", docRef.id);
    return docRef.id; // Devuelve el ID del documento creado
  } catch (error) {
    console.error("Error al guardar la orden:", error);
    throw new Error("Error al guardar la orden");
  }
};
