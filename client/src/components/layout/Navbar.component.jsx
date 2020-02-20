import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
      <div className='content'>
        <h1>
          <Link to='/'>
            <i className='fas fa-microphone'></i> Escapebe
          </Link>
        </h1>
        <div className='links'>
          <Link to='/'>News</Link>
          <Link to='/'>Boards</Link>
          <Link to='/'>About</Link>
          <Link to='/'>FAQ</Link>
        </div>
        <div className='buttons'>
          <Link to='/register'>
            <button className='button'>Register</button>
          </Link>
          <Link to='login'>
            <button className='button'>Login</button>
          </Link>
        </div>
        <i className='fas fa-bars menu'> </i>
        <Link to='/'>
          <i className='fas fa-user user'></i>
        </Link>
      </div>
      <div className='dropdown'>
        <Link to='/'>News</Link>
        <Link to='/'>Boards</Link>
        <Link to='/'>About</Link>
        <Link to='/'>FAQ</Link>
      </div>
    </nav>
  );
};

export default Navbar;
