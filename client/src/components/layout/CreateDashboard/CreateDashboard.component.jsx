import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createDashboard } from '../../../redux/actions/dashboard';

const CreateDashboard = ({ createDashboard, history }) => {
  const [dashboardData, setDashboardData] = useState({
    about: ''
  });

  const { about } = dashboardData;

  const onChange = e =>
    setDashboardData({
      ...dashboardData,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    createDashboard(dashboardData, history);
  };

  return (
    <Fragment>
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <textarea
            placeholder='about'
            name='about'
            value={about}
            onChange={e => onChange(e)}
            required
          ></textarea>
        </div>
        <input type='submit' />
      </form>
    </Fragment>
  );
};

CreateDashboard.propTypes = {
  createDashboard: PropTypes.func.isRequired
};

export default connect(null, { createDashboard })(withRouter(CreateDashboard));
