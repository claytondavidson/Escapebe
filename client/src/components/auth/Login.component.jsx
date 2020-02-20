import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './register.styles.css';

const Login = () => {
  const [memberData, setMemberData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = memberData;

  const onChange = e =>
    setMemberData({ ...memberData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <Fragment>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='container'>
          <h1>Log In</h1>
          <p>Please fill in this form to log in.</p>

          <b>Email</b>
          <input
            type='text'
            placeholder='Enter Email'
            name='email'
            required
            value={email}
            onChange={e => onChange(e)}
          />
          <br />

          <b>Password</b>
          <input
            type='password'
            placeholder='Enter Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            required
          />
          <br />
          <button type='submit' className='registerbtn'>
            Login
          </button>
        </div>

        <div className='container signin'>
          <p>
            Don't have an account? <Link to='/register'>Register</Link>.
          </p>
        </div>
      </form>
    </Fragment>
  );
};
export default Login;
