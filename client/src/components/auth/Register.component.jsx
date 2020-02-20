import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alert';
import PropTypes from 'prop-types';
import './register.styles.css';

const Register = ({ setAlert }) => {
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
      setAlert('passwords do not match', 'danger');
    } else {
      console.log('success');
    }
  };

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

          <b>Repeat Password</b>
          <input
            type='password'
            placeholder='Repeat Password'
            name='repeat'
            required
            value={repeat}
            onChange={e => onChange(e)}
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
            Already have an account? <Link to='/login'>Sign In</Link>.
          </p>
        </div>
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(Register);
