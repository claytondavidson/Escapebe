import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../redux/actions/auth';
import { Form } from 'react-bootstrap';
import { Button, Col, Row, Container, Card } from 'react-bootstrap';

const Login = ({ login, isAuthenticated }) => {
  const [memberData, setMemberData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = memberData;

  const onChange = e =>
    setMemberData({ ...memberData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Container style={{ color: 'black' }}>
        <Card style={{ width: '20rem' }} className='ml-md-auto'>
          <Container>
            <Row>
              <div className='mx-auto'>
                <Form onSubmit={e => onSubmit(e)}>
                  <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Email'
                      name='email'
                      required
                      value={email}
                      onChange={e => onChange(e)}
                    />
                    <Form.Text className='text-muted'>
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Enter Password'
                      name='password'
                      value={password}
                      onChange={e => onChange(e)}
                      required
                    />
                  </Form.Group>
                  <Button
                    variant='primary'
                    type='submit'
                    id='loginSubmitButton'
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </Row>
          </Container>
        </Card>
      </Container>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
