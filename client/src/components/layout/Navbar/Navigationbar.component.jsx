import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../redux/actions/auth';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';
import GroupSearch from '../../search/GroupSearch.component';
//import Login from '../../auth/Login/Login.component';
//var ReactFitText = require('react-fittext');

export const Navigationbar = ({
  auth: { isAuthenticated, loading },
  logout
}) => {
  const authLinks = (
    <div>
      <Nav>
        <Nav.Link as={Link} to='/dashboard'>
          <i className='fas fa-tv'></i>
          Dashboard
        </Nav.Link>

        <Nav.Link as={Link} to='/groups' className='mr-xl-5'>
          <i className='fas fa-users'></i>
          Groups
        </Nav.Link>

        <Nav.Link onClick={logout} as={Link} to='/'>
          <Button className='btn-success ml-xl-5' id='logoutButton'>
            <i className='fas fa-sign-out-alt'></i>
            Logout
          </Button>
        </Nav.Link>
        <div id='searchBarContainer' className='d-none d-lg-block'>
          <div id='searchBar'>
            <GroupSearch />
          </div>
        </div>
        <div className='d-block d-lg-none'>
          <GroupSearch />
        </div>
      </Nav>
    </div>
  );

  const guestLinks = (
    <div>
      <div className='float-right ml-xl-5'>
        <div className='ml-xl-5'>
          <Nav id='loginNavbar' className='mx-lg-5'>
            <Button
              as={Link}
              to='/register'
              className='btn-success ml-lg-3 mr-lg-3'
              id='registerButton'
            >
              <i className='fas fa-user-plus'></i>
              Register
            </Button>
            <Button
              as={Link}
              to='/login'
              className='btn-success mr-5 mt-1 mt-lg-0 '
              id='loginButton'
            >
              <i className='fas fa-sign-in-alt'></i>
              Login
            </Button>
          </Nav>
        </div>
      </div>
    </div>
  );

  return (
    <Navbar bg='dark' variant='dark' expand='lg' className=''>
      <Navbar.Brand as={Link} to='/'>
        <i className='fas fa-microphone ml-xl-3'></i> Escapebe
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Row className='mx-auto'>
          <Nav className='' id='navBarnavBar'>
            <Nav.Link as={Link} to='/news'>
              <i className='fas fa-newspaper'></i>
              News
            </Nav.Link>
            <Nav.Link as={Link} to='/about'>
              <i className='fas fa-info-circle'></i>
              About
            </Nav.Link>

            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </Nav>
        </Row>
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
