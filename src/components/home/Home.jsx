import React from "react";
import Card_Home from "./card_home";
import carterasImg from "../../assets/cartera-home.jpg";
import billeterasImg from "../../assets/billetera-home.jpg";
import mochilasImg from "../../assets/mochi-home.jpg";
import riñonerasImg from "../../assets/riñonera-home.jpg";
import logoImg from "../../assets/encantadaLogo.jpg";
import destacado1Img from "../../assets/promo1.jpg";
import destacado2Img from "../../assets/carrusel1.jpg";
import "./Home.css";

const Home = () => {
	const cards = [
		{ image: carterasImg, title: "Carteras", route: "/carteras" },
		{ image: billeterasImg, title: "Billeteras", route: "/billeteras" },
		{ image: mochilasImg, title: "Mochilas", route: "/mochilas" },
		{ image: riñonerasImg, title: "Riñoneras", route: "/riñoneras" },
	];

	return (
		<div className="home-container">
			<h2 className="home-title">Ven y enamórate</h2>
			<div className="cards-container">
				{cards.map((card, index) => (
					<Card_Home
						key={index}
						image={card.image}
						title={card.title}
						route={card.route}
					/>
				))}
			</div>

			{/* Contenedor del logo de la tienda */}
			<div className="logo-container">
				<img src={logoImg} alt="Logo de la tienda" className="store-logo" />
			</div>

			{/* Contenedor del título de productos destacados */}
			<h2 className="featured-title">Productos destacados</h2>

			{/* Contenedor de las imágenes de productos destacados */}
			<div className="featured-products">
				<img
					src={destacado1Img}
					alt="Producto destacado 1"
					className="featured-image"
				/>
				<img
					src={destacado2Img}
					alt="Producto destacado 2"
					className="featured-image"
				/>
			</div>
		</div>
	);
};

export default Home;
