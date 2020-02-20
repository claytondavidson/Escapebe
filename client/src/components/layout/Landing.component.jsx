import React from 'react';
import { Link } from 'react-router-dom';

export const Landing = () => {
  return (
    <div className='page-content'>
      <div className='page-inner-content'>
        <h1>Say whatever you want.</h1>
        <p>Speak freely without fear of being censored.</p>
        <Link to='/'>
          <button className='button'>Learn More</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
