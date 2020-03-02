import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigationbar from './components/layout/Navbar/Navigationbar.component';
import Landing from './components/layout/Landing/Landing.component';
import Register from './components/auth/Register/Register.component';
import Login from './components/auth/Login/Login.component';
import ProtectedRoute from './components/routing/ProtectedRoute.component';
import Dashboard from './components/layout/Dashboard/Dashboard.component';
import Groups from './components/layout/Groups/Groups.component';
import Group from './components/layout/Group/Group.component';
import Post from './components/layout/Post/Post.component';
import CreateDashboard from './components/layout/CreateDashboard/CreateDashboard.component';
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadMember } from './redux/actions/auth';
import setToken from './utilities/setToken';
import './scss/app.styles.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

if (localStorage.token) {
  setToken(localStorage.token);
}

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await store.dispatch(loadMember());
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Fragment></Fragment>;
  }

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navigationbar />
          <Route exact path='/' component={Landing} />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
            <ProtectedRoute
              exact
              path='/create-dashboard'
              component={CreateDashboard}
            />
            <ProtectedRoute exact path='/groups' component={Groups} />
            <ProtectedRoute exact path='/group/:id' component={Group} />
            <ProtectedRoute
              exact
              path='/group/:group_id/:post_id'
              component={Post}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
