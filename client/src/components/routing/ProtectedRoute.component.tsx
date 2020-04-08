import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...anything }) => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const isLoading = useSelector((state: any) => state.auth.isLoading);
  return (
    <Route
      {...anything}
      render={(props) =>
        !isAuthenticated && !isLoading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default ProtectedRoute;
