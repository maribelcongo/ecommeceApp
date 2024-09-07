// src/components/footer/Footer.jsx
import React from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa"; // Importa los iconos de FontAwesome
import paymentImage from "../../assets/pagos.jpg"; // Importa la imagen de medios de pago
import "./footer.css"; // Importa el archivo de estilos

const Footer = () => {
	return (
		<footer className="footer-container">
			{/* Sección "Sobre Nosotros" */}
			<div className="footer-section">
				<h3>Sobre Nosotros</h3>
				<p>
					Somos una tienda especializada en productos de alta calidad. Nuestro
					objetivo es ofrecer a nuestros clientes una experiencia de compra
					excepcional.
				</p>
			</div>

			{/* Sección "Medios de Pago" */}
			<div className="footer-section">
				<img
					src={paymentImage}
					alt="Medios de Pago"
					className="payment-image"
				/>
			</div>

			{/* Sección "Síguenos en Nuestras Redes" */}
			<div className="footer-section">
				<h3>Síguenos en Nuestras Redes</h3>
				<div className="social-icons">
					<a
						href="https://www.instagram.com"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
					>
						<FaInstagram className="social-icon" />
					</a>
					<a
						href="https://www.twitter.com"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Twitter"
					>
						<FaTwitter className="social-icon" />
					</a>
					<a
						href="https://www.facebook.com"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Facebook"
					>
						<FaFacebook className="social-icon" />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
