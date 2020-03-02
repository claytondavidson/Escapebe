import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from '../../auth/Login/Login.component';
export const HeroSection = () => {
  return (
    <div>
    <div className='container' id="heroSectionContainer">
      
      <div className="row align-items-center mt-5">
      <h1 className="col-12">Say what you want</h1>
      <p className='col-12 subtitle'>Speak freely without fear of being censored</p>
      <Button id="learnMoreButton" className="ml-5" as={Link} to='/about'>
        Learn More
      </Button>
      </div>
      <Login/>
    </div>
    </div>
  );
};

export default HeroSection;
