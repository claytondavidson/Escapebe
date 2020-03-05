import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DashboardBehaviors = props => {
  return (
    <Fragment>
      <Link to='/edit-dashboard'>Edit Dashboard</Link>
    </Fragment>
  );
};

DashboardBehaviors.propTypes = {};

export default DashboardBehaviors;
