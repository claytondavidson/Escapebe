import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../redux/actions/auth';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Container } from 'react-bootstrap';

export const Navigationbar = ({
  auth: { isAuthenticated, loading },
  logout
}) => {
  const authLinks = (
    <div>
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/dashboard">
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/groups">
          Groups
        </Nav.Link>
        <Nav.Link onClick={logout} as={Link} to="/">
          Logout
        </Nav.Link>
      </Nav>
    </div>
  );

  const guestLinks = (
    <div>
        <div className="mx-md-auto">
        <Row>
        <Nav className="ml-0">
          <Col>
          <Button className="btn-success" as={Link} to="/register" id="registerButton">
            Register
          </Button>
          </Col>
          <Col>
          <Button className="btn-success"  as={Link} to="/login" id="loginButton">
            Login
          </Button>
          </Col>
        </Nav>
        </Row>
        </div>
    </div>
  );

  return (
    <Navbar expand="md">
      <Navbar.Brand as={Link} to="/">
        <i className="fas fa-microphone"></i> Escapebe
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/news">
            News
          </Nav.Link>
          <Nav.Link as={Link} to="/members">
            Members
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/faq">
            FAQ
          </Nav.Link>
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
