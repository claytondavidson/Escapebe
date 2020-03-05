import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../redux/actions/auth';
import { Form } from 'react-bootstrap';
import { Button, Row, Container, Card, Col } from 'react-bootstrap';
import HeroSection from '../../layout/HeroSection/HeroSection.component';

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
      <Container className='mx-auto'>
        <div className='row'>
          <Col xs='12' md='6'>
            <HeroSection />
          </Col>
          <Container
            xs='12'
            md='6'
            className='col-xs-12 col-md-6 mt-5'
            style={{ color: 'black' }}
          >
            <Card style={{ width: '16.5em' }} className='mx-md-auto'>
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
                        className=''
                      >
                        Submit
                      </Button>
                    </Form>
                  </div>
                </Row>
              </Container>
            </Card>
          </Container>
        </div>
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
