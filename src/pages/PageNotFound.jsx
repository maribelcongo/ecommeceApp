// src/pages/PageNotFound.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./pageNotFound.css"; 

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
		<div className="page-not-found"/>
			
	);
};

export default PageNotFound;
