import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../redux/actions/auth';
import './Navbar.styles.css';
import ham from './assets/ham.svg';
import exit from './assets/exit.svg';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const authLinks = (
    <div className='buttons'>
      <Link to='/'>
        <button onClick={logout} className='button'>
          Logout
        </button>
      </Link>
    </div>
  );

  const guestLinks = (
    <div className='buttons'>
      <Link to='/register'>
        <button className='button'>Register</button>
      </Link>
      <Link to='login'>
        <button className='button'>Login</button>
      </Link>
    </div>
  );

  return (
    <div className='container'>
      <header>
        <h2>
          <Link
            to='/'
            className='logo text-shadow-drop-center'
            alt='Escapebe logo'
          >
            <i className='fas fa-microphone'></i> Escapebe
          </Link>
        </h2>
        <nav>
          <Link to='#' className='hide-desktop'>
            <img
              src={ham}
              alt='toggle menu'
              className='menu'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </Link>
          <ul
            className={isMenuOpen ? 'hide-desktop' : 'show-desktop hide-mobile'}
          >
            <li className='exit-btn hide-desktop'>
              <img
                src={exit}
                alt='exit button'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </li>
            <li>
              <Link to='/'>News</Link>
            </li>
            <li>
              <Link to='/'>Groups</Link>
            </li>
            <li>
              <Link to='/'>About</Link>
            </li>
            <li>
              <Link to='/'>FAQ</Link>
            </li>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
