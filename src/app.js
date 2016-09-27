// /* eslint-disable */

import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, browserHistory } from 'react-router';

import MasterPage from './pages/MasterPage';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

ReactStormpath.init();
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={MasterPage}>
      <LoginRoute path="/login" component={LoginPage} />
      <Route path="/register" component={RegistrationPage} />
      <IndexRoute component={IndexPage} />
    </Route>
  </Router>
),
  document.getElementById('app-container')
);
