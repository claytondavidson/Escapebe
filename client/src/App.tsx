import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigationbar from './components/layout/Navbar/Navigationbar.component';
import Landing from './components/layout/Landing/Landing.component';
import { Provider } from 'react-redux';
import Routes from './components/routing/Routes.component';
import store from './redux/store';
import { loadMember } from './redux/actions/auth';
import setToken from './utilities/setToken';
import { TinyButton as ScrollUpButton } from 'react-scroll-up-button';
import './scss/app.styles.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

if (localStorage.token) {
  setToken(localStorage.token);
}

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await store.dispatch<any>(loadMember());
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
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
          <ScrollUpButton style={{ background: '#dbdae8' }} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
