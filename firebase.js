import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // Importar ref y getDownloadURL

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUT_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // Inicializar el almacenamiento




// Función para obtener la URL de descarga de una imagen
export const getImageUrl = async (imagePath) => {
  try {
    const imageRef = ref(storage, imagePath); 
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error al obtener la URL de la imagen:", error);
    return ""; // Devuelve una cadena vacía si hay un error
  }
};
