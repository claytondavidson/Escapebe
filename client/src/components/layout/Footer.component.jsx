import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.styles.css';

export const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='container'>
        <p className='address'>
          St. Helena Island, 29920 <br />
          United States of America
        </p>
        <ul className='footer-links'>
          <li>
            <Link to='/'>Terms of Service</Link>
          </li>
          <li>
            <Link to='/'>Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
