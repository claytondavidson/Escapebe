import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/auth';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
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
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
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

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
