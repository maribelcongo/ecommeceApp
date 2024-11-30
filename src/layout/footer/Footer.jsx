import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Íconos sociales
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaCcAmex,
  FaApple,
  FaGooglePay,
} from "react-icons/fa"; // Íconos de pago
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="ico_footer">
        {/* Sección de redes sociales */}
        <div className="social-icons">
          <h4>Nuestras redes</h4> {/* Título de redes sociales */}
          <div className="icons-row">
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
              href="mailto:encantada.bs@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Correo"
            >
              <FaEnvelope className="social-icon" />
            </a>
          </div>
        </div>

        {/* Sección de medios de pago */}
        <div className="payment-icons">
          <h4>Medios de pago</h4> {/* Título de medios de pago */}
          <div className="icons-row">
            <span className="payment-icon">
              <FaCcVisa />
            </span>
            <span className="payment-icon">
              <FaCcMastercard />
            </span>
            <span className="payment-icon">
              <FaPaypal />
            </span>
          </div>
          <div className="icons-row">
            <span className="payment-icon">
              <FaCcAmex />
            </span>
            <span className="payment-icon">
              <FaApple />
            </span>
            <span className="payment-icon">
              <FaGooglePay />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
