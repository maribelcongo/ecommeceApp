import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useLocation, Navigate } from "react-router-dom";
import CardProduct from "./CardProduct";
import PageNotFound from "../../pages/PageNotFound";

const db = getFirestore();

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [notFound, setNotFound] = useState(false); // Estado para manejar 404
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let q;
        const currentPath = location.pathname;

        // Si estamos en la ruta principal "/", traemos todos los productos
        if (currentPath === "/") {
          q = collection(db, "productos");
        } else {
          // Para rutas específicas de categorías, filtramos por 'type'
          const type = currentPath.substring(1); // Extrae la categoría de la URL
          q = query(collection(db, "productos"), where("type", "==", type));
        }

        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);

        // Si no se encuentran productos, seteamos el estado de 'notFound'
        if (productsData.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, [location.pathname]);

  // Si no se encuentran productos, mostramos la página de 404
  if (notFound) {
    return <PageNotFound />;
  }

  return (
    <div className="productListContainer">
      {products.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
