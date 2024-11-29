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
      {/* <div className="social-icons">
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
      </div> */}

      <div className="payment-icons">
        <a
          href="https://www.visa.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visa"
        >
          <FaCcVisa className="payment-icon" />
        </a>
        <a
          href="https://www.mastercard.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Mastercard"
        >
          <FaCcMastercard className="payment-icon" />
        </a>
        <a
          href="https://www.paypal.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="PayPal"
        >
          <FaPaypal className="payment-icon" />
        </a>
        <a
          href="https://www.americanexpress.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="American Express"
        >
          <FaCcAmex className="payment-icon" />
        </a>
        <a
          href="https://www.apple.com/apple-pay/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Apple Pay"
        >
          <FaApple className="payment-icon" />
        </a>
        <a
          href="https://pay.google.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Pay"
        >
          <FaGooglePay className="payment-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
