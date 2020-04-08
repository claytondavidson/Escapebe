import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../redux/actions/auth';
import { Form } from 'react-bootstrap';
import { Button, Row, Container, Card, Col } from 'react-bootstrap';
import HeroSection from '../../layout/HeroSection/HeroSection.component';

interface MemberData {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const [memberData, setMemberData] = useState<MemberData>({
    email: '',
    password: '',
  });

  const { email, password } = memberData;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMemberData({ ...memberData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }));
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
            className='col-xs-12 col-md-6 mt-5'
            style={{ color: 'black' }}
          >
            <Card style={{ width: '16.5em' }} className='mx-md-auto'>
              <Container>
                <Row>
                  <div className='mx-auto'>
                    <Form
                      onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                        onSubmit(e)
                      }
                    >
                      <Form.Group controlId='formBasicEmail'>
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

export default Login;
