import React from "react";
import Card_Home from "./card_home";
import Carousel from "./carousel";
import Carousel_home from "./Carousel_home";
import carterasImg from "../../assets/cartera-home.jpg";
import billeterasImg from "../../assets/billetera-home.jpg";
import mochilasImg from "../../assets/mochi-home.jpg";
import riñonerasImg from "../../assets/riñonera-home.jpg";
import logoImg from "../../assets/encantadaLogo.jpg";
import destacado1Img from "../../assets/ri1home.jpg";
import destacado2Img from "../../assets/billehome3.jpg";
import destacado3Img from "../../assets/mochihome2.jpg";
import destacado4Img from "../../assets/cartera1.jpg";
import destacado5Img from "../../assets/billehome2.jpg";
import destacado6Img from "../../assets/mochi4.jpg";
import destacado7Img from "../../assets/c4.jpg";
import destacado8Img from "../../assets/ri2home.jpg";

import "./home.css";
import CardProduct_home from "../card/CardProduct_home";

const Home = () => {
	const cards = [
		{ image: carterasImg, title: "Carteras", route: "/carteras" },
		{ image: billeterasImg, title: "Billeteras", route: "/billeteras" },
		{ image: mochilasImg, title: "Mochilas", route: "/mochilas" },
		{ image: riñonerasImg, title: "Riñoneras", route: "/riñoneras" },
	];

	return (
		<div className="home-container">
			<Carousel />
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
			<div className="logo-container">
				<img src={logoImg} alt="Logo de la tienda" className="store-logo" />
			</div>
			<h2 className="featured-title">Productos destacados</h2>
			<div className="featured-products">
				<CardProduct_home />
			</div>

			<Carousel_home />
		</div>
	);
};

export default Home;
