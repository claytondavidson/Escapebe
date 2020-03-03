import React from 'react';
import HeroSection from '../HeroSection/HeroSection.component';
import Login from '../../auth/Login/Login.component';
import Register from '../../auth/Register/Register.component';
import { Button, Col, Row, Container, Card } from 'react-bootstrap';

var ReactFitText = require('react-fittext');
export const Landing = () => {
  return (
    <div>
      <div className="">
      <Register/>
      </div>
    </div>
  );
};

export default Landing;
