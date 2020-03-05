import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createDashboard,
  getCurrentDashboard
} from '../../../redux/actions/dashboard';

const EditDashboard = ({
  dashboard: { dashboard, loading },
  createDashboard,
  getCurrentDashboard,
  history
}) => {
  const [dashboardData, setDashboardData] = useState({
    about: ''
  });

  const { about } = dashboardData;

  useEffect(() => {
    getCurrentDashboard();
    setDashboardData({
      about: !dashboard.about || loading ? '' : dashboard.about
    });
  }, [loading]);

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

EditDashboard.propTypes = {
  createDashboard: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
  getCurrentDashboard: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  dashboard: state.dashboard
});

export default connect(mapStateToProps, {
  createDashboard,
  getCurrentDashboard
})(withRouter(EditDashboard));
