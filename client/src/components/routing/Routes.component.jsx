import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register/Register.component';
import Login from '../auth/Login/Login.component';
import ProtectedRoute from './ProtectedRoute.component';
import Dashboard from '../layout/Dashboard/Dashboard.component';
import Groups from '../layout/Groups/Groups.component';
import Group from '../layout/Group/Group.component';
import Post from '../layout/Post/Post.component';
import CreateDashboard from '../layout/CreateDashboard/CreateDashboard.component';
import EditDashboard from '../layout/EditDashboard/EditDashboard.component';
import NotFound from '../layout/NotFound/NotFound.component';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <ProtectedRoute exact path='/dashboard' component={Dashboard} />
      <ProtectedRoute
        exact
        path='/create-dashboard'
        component={CreateDashboard}
      />
      <ProtectedRoute exact path='/edit-dashboard' component={EditDashboard} />
      <ProtectedRoute exact path='/groups' component={Groups} />
      <ProtectedRoute exact path='/group/:id' component={Group} />
      <ProtectedRoute exact path='/group/:group_id/:post_id' component={Post} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
