import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../redux/actions/auth';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Navigationbar = ({
  auth: { isAuthenticated, loading },
  logout
}) => {
  const authLinks = (
    <div>
      <Nav className='ml-auto'>
        <Nav.Item as={Link} to='/dashboard'>
          Dashboard
        </Nav.Item>
        <Nav.Item as={Link} to='/groups'>
          Groups
        </Nav.Item>
        <Nav.Item onClick={logout} as={Link} to='/'>
          Logout
        </Nav.Item>
      </Nav>
    </div>
  );

  const guestLinks = (
    <div>
      <Nav className='ml-auto'>
        <Nav.Item as={Link} to='/register'>
          Register
        </Nav.Item>
        <Nav.Item as={Link} to='/login'>
          Login
        </Nav.Item>
      </Nav>
    </div>
  );

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Navbar.Brand as={Link} to='/'>
        <i className='fas fa-microphone'></i> Escapebe
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          <Nav.Item as={Link} to='/news'>
            News
          </Nav.Item>
          <Nav.Item as={Link} to='/members'>
            Members
          </Nav.Item>
          <Nav.Item as={Link} to='/about'>
            About
          </Nav.Item>
          <Nav.Item as={Link} to='/faq'>
            FAQ
          </Nav.Item>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Navigationbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navigationbar);
