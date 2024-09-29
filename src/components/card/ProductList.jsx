// import React, { useEffect, useState } from "react";
// import {
// 	getFirestore,
// 	collection,
// 	getDocs,
// 	query,
// 	where,
// } from "firebase/firestore";
// import { useLocation } from "react-router-dom";
// import CardProduct from "./CardProduct";

// const db = getFirestore();

// const ProductList = () => {
// 	const [products, setProducts] = useState([]);
// 	const location = useLocation();

// 	useEffect(() => {
// 		const fetchProducts = async () => {
// 			try {
// 				let q;
// 				const currentPath = location.pathname;

// 				if (currentPath === "/") {
// 					// Si estás en la página principal, no filtrar
// 					q = collection(db, "productos");
// 				} else {
// 					// Filtra por tipo según la ruta
// 					const type = currentPath.substring(1);
// 					q = query(collection(db, "productos"), where("type", "==", type));
// 				}

// 				const querySnapshot = await getDocs(q);
// 				const productsData = querySnapshot.docs.map((doc) => ({
// 					id: doc.id,
// 					...doc.data(),
// 				}));
// 				setProducts(productsData);
// 			} catch (error) {
// 				console.error("Error al obtener los productos:", error);
// 			}
// 		};

// 		fetchProducts();
// 	}, [location.pathname]); // Vuelve a ejecutar cuando cambie la ruta

// 	return (
// 		<div className="productListContainer">
// 			{products.length > 0 ? (
// 				products.map((product) => (
// 					<CardProduct key={product.id} product={product} />
// 				))
// 			) : (
// 				<p>No hay productos disponibles.</p>
// 			)}
// 		</div>
// 	);
// };

// export default ProductList;
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

				if (currentPath === "/") {
					q = collection(db, "productos");
				} else {
					const type = currentPath.substring(1);
					q = query(collection(db, "productos"), where("type", "==", type));
				}

				const querySnapshot = await getDocs(q);
				const productsData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				
				setProducts(productsData);
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
