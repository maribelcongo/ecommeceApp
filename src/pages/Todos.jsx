import React, { useEffect, useState } from "react"; 
import {
	getFirestore,
	collection,
	getDocs,
} from "firebase/firestore";
import CardProduct from "../components/card/CardProduct"; 
import './Todos.css'; 

const db = getFirestore();

const Todos = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true); // Estado para manejar la carga

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, "productos"));
				const productsData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setProducts(productsData);
			} catch (error) {
				console.error("Error al obtener los productos:", error);
			} finally {
				setLoading(false); // Finaliza la carga
			}
		};

		fetchProducts();
	}, []); // Se ejecuta una vez al cargar el componente

	if (loading) {
		return <div className="spinner"></div>; // Muestra el spinner mientras se obtienen los productos
	}

	return (
		<div className="todosContainer">
			<h1>Todos Nuestros Productos</h1>
			<div className="productListContainer">
				{products.map((product) => (
					<CardProduct key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Todos;
