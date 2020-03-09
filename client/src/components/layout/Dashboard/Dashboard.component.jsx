import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentDashboard } from '../../../redux/actions/dashboard';
import Spinner from '../Spinner/Spinner.component';
import DashboardBehaviors from '../DashboardBehaviors/DashboardBehaviors.component';
import { Nav } from 'react-bootstrap';
import { getGroups } from '../../../redux/actions/group';

const Dashboard = ({
  getCurrentDashboard,
  auth: { member },
  dashboard: { dashboard, loading },
  getGroups
}) => {
  useEffect(() => {
    getGroups();
    getCurrentDashboard();
  }, [getCurrentDashboard, getGroups]);

  return loading && dashboard === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Dashboard</h1>
      <p>Welcome {member && member.username}!</p>
      {dashboard !== null ? (
        <Fragment>
          <DashboardBehaviors />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet set up a dashboard</p>
          <Nav>
            <Nav.Link as={Link} to='/create-dashboard' className='button'>
              Create Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to='/groups' className='button'>
              Find Groups
            </Nav.Link>
            <Nav.Link as={Link} to='/news' className='button'>
              Read the News
            </Nav.Link>
          </Nav>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentDashboard: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
  getGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  dashboard: state.dashboard,
  group: state.group
});

export default connect(mapStateToProps, { getCurrentDashboard, getGroups })(
  Dashboard
);
