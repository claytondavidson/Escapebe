import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../redux/actions/auth';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Container, Form, FormControl} from 'react-bootstrap';
import Login from '../../auth/Login/Login.component';
export const Navigationbar = ({
  auth: { isAuthenticated, loading },
  logout
}) => {
  const authLinks = (
    <div>
      <Nav>
        <Nav.Link as={Link} to="/dashboard">
        <i class="fas fa-tv"></i>
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/groups">
        <i class="fas fa-users"></i>
          Groups
        </Nav.Link>
        <Nav.Link onClick={logout} as={Link} to="/">
          <Button
            className="btn-success ml-lg-3"
            as={Link}
            to="/login"
            id="loginButton"
          >
            <i class="fas fa-sign-out-alt"></i>
            Logout
            
          </Button>
        </Nav.Link>
        <Form className="mr-md-5" inline>
      <FormControl type="text" placeholder="Search for Groups" className="mr-md-2" />
      
      <Button  variant="outline-success"> <i class="fas fa-search"></i> Search</Button>
    </Form>
      </Nav>
    </div>
  );

  const guestLinks = (
    <div>
      <div className="float-right ml-xl-5">
        <div className="ml-xl-5">
          <Nav id="loginNavbar" className="mx-lg-5">
            <Button
              className="btn-success ml-md-3 mr-lg-3"
              as={Link}
              to="/register"
              id="registerButton"
            >
              <i class="fas fa-user-plus"></i>
              Register
            </Button>

            <Button
              className="btn-success mr-5"
              as={Link}
              to="/login"
              id="loginButton"
            >
              <i class="fas fa-sign-in-alt"></i>
              Login
            </Button>
          </Nav>
        </div>
      </div>
    </div>
  );

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Navbar.Brand as={Link} to="/">
        <i className="fas fa-microphone ml-xl-3"></i> Escapebe
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Row className="mx-auto">
          <Nav className="" id="navBarnavBar">
            <Nav.Link as={Link} to="/news">
              <i className="fas fa-newspaper"></i>
              News
            </Nav.Link>
            <Nav.Link as={Link} to="/members">
            <i class="fas fa-user-friends"></i>
              Members
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
            <i class="fas fa-info-circle"></i>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/faq">
            <i class="fas fa-question-circle"></i>
              FAQ
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
