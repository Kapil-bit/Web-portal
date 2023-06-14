import React from 'react';
import './Footer.css';
import currentYear from '../../../utils/DateGenerator';

const Footer = () => {
  return (
    <footer className="footer">
       <p>Copyright © WeatherPortal <span className="year">{currentYear}</span></p>
    </footer>
  );
}

export default Footer;
