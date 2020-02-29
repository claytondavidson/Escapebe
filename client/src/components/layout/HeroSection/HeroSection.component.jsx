import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className='hero'>
      <div className='hero-inner'>
        <h1 className='x-large'>Say what you want</h1>
        <p className='subtitle'>Speak freely without fear of being censored</p>
        <div className='buttons'>
          <Link to='/about' className='button button-primary'>
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
