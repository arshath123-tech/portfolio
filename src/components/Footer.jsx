import React from 'react';
import '../styles/components/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">Portfolio</div>
        
        <ul className="footer-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <p className="footer-text">
          &copy; {currentYear} Developer Portfolio. Built with React Js. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
