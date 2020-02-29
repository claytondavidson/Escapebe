import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className='hero'>
      <div className='hero-inner'>
        <h1 className='x-large'>Say what you want</h1>
        <p className='subtitle'>Speak freely without fear of being censored</p>
        <Link to='/register' className='button button-primary'>
          Register
        </Link>
        <Link to='/login' className='button button-primary'>
          Login
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
