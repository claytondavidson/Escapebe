import React from 'react';
import { Link } from 'react-router-dom';
import triangle from './assets/triangle.svg';
import './HeroSection.styles.css';

export const HeroSection = () => {
  return (
    <section>
      <div className='container'>
        <h1>Say whatever you want.</h1>
        <p className='subtitle'>Speak freely without fear of being censored.</p>
        <Link to='/'>
          <button className='button'>Learn More</button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
