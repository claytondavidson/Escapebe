import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../../redux/actions/auth';
import { Form } from 'react-bootstrap';
import { Button, Col, Row, Container, Card } from 'react-bootstrap';
const Register = ({ register, isAuthenticated }) => {
  const [memberData, setMemberData] = useState({
    username: '',
    email: '',
    password: '',
    repeat: ''
  });

  const { username, email, password, repeat } = memberData;

  const onChange = e =>
    setMemberData({ ...memberData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== repeat) {
      console.log('passwords do not match');
    } else {
      register({ username, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <br></br>
      <div className="container" style={{ color: 'black' }}>
        <Card style={{ width: '20rem' }} className="ml-md-auto">
          <div className="container">
            <div className="row">
              <div className="mx-auto">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <Form onSubmit={e => onSubmit(e)}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Username"
                      name="username"
                      required
                      value={username}
                      onChange={e => onChange(e)}
                    />
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Email"
                      name="email"
                      required
                      value={email}
                      onChange={e => onChange(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      value={password}
                      onChange={e => onChange(e)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Repeat Password"
                      name="repeat"
                      value={repeat}
                      onChange={e => onChange(e)}
                      required
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    id="loginSubmitButton"
                    className="registerbtn"
                  >
                    Register
                  </Button>
                  <p class="text-center">
                    By creating an account you agree to our{' '}
                    <Link to="/">Terms & Privacy</Link>
                  </p>

                  <div className="container signin">
                    <p>
                      Already have an account? <Link to="/login">Login</Link>.
                    </p>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
