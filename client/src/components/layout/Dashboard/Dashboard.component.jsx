import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentDashboard } from '../../../redux/actions/dashboard';
import Spinner from '../Spinner/Spinner.component';

const Dashboard = ({
  getCurrentDashboard,
  auth: { member },
  dashboard: { dashboard, loading }
}) => {
  useEffect(() => {
    getCurrentDashboard();
  }, [getCurrentDashboard]);

  return loading && dashboard === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Dashboard</h1>
      <p>Welcome {member && member.username}!</p>
      {dashboard !== null ? (
        <Fragment>has</Fragment>
      ) : (
        <Fragment>
          <p>You have not yet set up a dashboard</p>
          <Link to='/create-dashboard' className='button'>
            Create Dashboard
          </Link>
          <Link to='/groups' className='button'>
            Find Groups
          </Link>
          <Link to='/' className='button'>
            Return to Home
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentDashboard: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  dashboard: state.dashboard
});

export default connect(mapStateToProps, { getCurrentDashboard })(Dashboard);
