// src/components/Home/Card_Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Card_Home = ({ image, title, route }) => {
	return (
		<div className="card">
			<Link to={route}>
				<div className="card-content">
					<img src={image} alt={title} className="card-image" />
					<div className="card-title">{title}</div>
				</div>
			</Link>
		</div>
	);
};

export default Card_Home;
