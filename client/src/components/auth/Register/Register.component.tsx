import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../../redux/actions/auth';
import { Form } from 'react-bootstrap';
import { Button, Col, Row, Container, Card } from 'react-bootstrap';
import HeroSection from '../../layout/HeroSection/HeroSection.component';

interface MemberData {
  username: string;
  email: string;
  password: string;
  repeat: string;
}

const Register: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const [memberData, setMemberData] = useState<MemberData>({
    username: '',
    email: '',
    password: '',
    repeat: '',
  });

  const { username, email, password, repeat } = memberData;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMemberData({ ...memberData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== repeat) {
      console.log('passwords do not match');
    } else {
      dispatch(register({ username, email, password }));
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Container className='mx-md-auto'>
        <Row>
          <Col xs='12' md='6'>
            <HeroSection />
          </Col>
          <Col xs='12' md='6' className='mt-5'>
            <Container style={{ color: 'black' }}>
              <Card style={{ width: '16.5rem' }} className='mx-md-auto'>
                <Container>
                  <Row>
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <Form
                      onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                        onSubmit(e)
                      }
                    >
                      <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter Username'
                          name='username'
                          required
                          value={username}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => onChange(e)}
                        />
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter Email'
                          name='email'
                          required
                          value={email}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => onChange(e)}
                        />
                      </Form.Group>
                      <Form.Group controlId='formPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='Enter Password'
                          name='password'
                          value={password}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => onChange(e)}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='Repeat Password'
                          name='repeat'
                          value={repeat}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => onChange(e)}
                          required
                        />
                      </Form.Group>
                      <Button
                        variant='primary'
                        type='submit'
                        id='loginSubmitButton'
                        className='registerbtn'
                      >
                        Register
                      </Button>
                      <p className='text-center'>
                        By creating an account you agree to our{' '}
                        <Link to='/'>Terms & Privacy</Link>
                      </p>

                      <div className='container signin text-center'>
                        <p>
                          Already have an account?{' '}
                          <Link to='/login'>Login</Link>.
                        </p>
                      </div>
                    </Form>
                  </Row>
                </Container>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Register;
