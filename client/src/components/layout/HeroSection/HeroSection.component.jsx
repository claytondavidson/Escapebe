import React, { Fragment } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <Fragment>
      <Container id='heroSectionContainer'>
        <Row className='mt-5 mr-auto'>
          <Col>
            <h1>Say what you want</h1>
            <p>Speak freely without fear of being censored</p>
            <Button id='learnMoreButton' as={Link} to='/about'>
              Learn More
            </Button>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default HeroSection;
