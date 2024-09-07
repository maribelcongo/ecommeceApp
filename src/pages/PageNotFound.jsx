// src/pages/PageNotFound.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./pageNotFound.css"; // Asegúrate de crear este archivo CSS para los estilos

const PageNotFound = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Redirige a la página principal después de 5 segundos
		const timer = setTimeout(() => {
			navigate("/");
		}, 5000);

		// Limpia el temporizador si el componente se desmonta antes de la redirección
		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className="page-not-found">
			<h1>404 - Página No Encontrada</h1>
		</div>
	);
};

export default PageNotFound;
