import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import CardProduct from "./CardProduct";
import { ClipLoader } from "react-spinners";
import "./cardProduct_home.css";

const CardProduct_home = () => {
	const [featuredProducts, setFeaturedProducts] = useState([]);
	const [loading, setLoading] = useState(true); // Estado para controlar la carga

	useEffect(() => {
		const fetchFeaturedProducts = async () => {
			setLoading(true); // Activa el spinner al comenzar la carga
			try {
				const q = query(
					collection(db, "productos"),
					where("type", "==", "destacado")
				);
				const querySnapshot = await getDocs(q);
				const products = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setFeaturedProducts(products);
			} catch (error) {
				console.error("Error fetching featured products:", error);
			} finally {
				setLoading(false); // Desactiva el spinner cuando la carga ha terminado
			}
		};

		fetchFeaturedProducts();
	}, []);

	return (
		<div>
			<div className="featured-products-container">
				{loading ? (
					<div className="spinner-container">
						<ClipLoader size={50} color={"#000"} loading={loading} />{" "}
						{/* Muestra el spinner */}
					</div>
				) : featuredProducts.length > 0 ? (
					featuredProducts.map((product) => (
						<CardProduct key={product.id} product={product} />
					))
				) : (
					<p>No hay productos destacados disponibles.</p>
				)}
			</div>
		</div>
	);
};

export default CardProduct_home;
