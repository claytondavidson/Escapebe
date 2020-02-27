import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar.component';
import Landing from './components/layout/Landing/Landing.component';
import Register from './components/auth/Register/Register.component';
import Login from './components/auth/Login/Login.component';
import Alert from './components/layout/Alert/Alert.component';
import ProtectedRoute from './components/routing/ProtectedRoute.component';
import Dashboard from './components/layout/Dashboard/Dashboard.component';
import Groups from './components/layout/Groups/Groups.component';
import CreateDashboard from './components/layout/CreateDashboard/CreateDashboard.component';
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadMember } from './redux/actions/auth';
import setToken from './utilities/setToken';
import './App.css';

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
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
