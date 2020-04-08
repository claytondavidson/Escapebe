import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DashboardBehaviors = () => {
  return (
    <Fragment>
      <Link to='/edit-dashboard'>Edit Dashboard</Link>
    </Fragment>
  );
};

export default DashboardBehaviors;
