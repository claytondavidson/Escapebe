import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../../redux/actions/auth';

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
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='container'>
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>

          <b>Username</b>
          <input
            type='text'
            placeholder='Enter Username'
            name='username'
            value={username}
            onChange={e => onChange(e)}
            required
          />
          <br />

          <b>Email</b>
          <input
            type='text'
            placeholder='Enter Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
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

          <b>Repeat Password</b>
          <input
            type='password'
            placeholder='Repeat Password'
            name='repeat'
            value={repeat}
            onChange={e => onChange(e)}
            required
          />
          <br />

          <p>
            By creating an account you agree to our{' '}
            <Link to='/'>Terms & Privacy</Link>
          </p>
          <button type='submit' className='registerbtn'>
            Register
          </button>
        </div>

        <div className='container signin'>
          <p>
            Already have an account? <Link to='/login'>Login</Link>.
          </p>
        </div>
      </form>
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
