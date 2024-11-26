import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Cambia los íconos
import paymentImage from "../../assets/pagos.jpg";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Sección "Sobre Nosotros" */}
      <div className="footer-section">
        <h3>Sobre Nosotros</h3>
        <p>Somos una tienda especializada en productos de alta calidad.</p>
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
            href="https://github.com/maribelcongo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="social-icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/maribel-congo-379727268"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="social-icon" />
          </a>
          <a
            href="encantada.bs@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Correo"
          >
            <FaEnvelope className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
