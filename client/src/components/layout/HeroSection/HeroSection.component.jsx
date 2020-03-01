import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className='container'>
      <h1 className='x-large'>Say what you want</h1>
      <p className='subtitle'>Speak freely without fear of being censored</p>
      <Button as={Link} to='/about'>
        Learn More
      </Button>
    </section>
  );
};

export default HeroSection;
