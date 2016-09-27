// /* eslint-disable */

import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, browserHistory } from 'react-router';

import MasterPage from './pages/MasterPage';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProfilePage from './pages/ProfilePage';

ReactStormpath.init();
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={MasterPage}>
      <IndexRoute component={IndexPage} />
      <LoginRoute path="/login" component={LoginPage} />
      <Route path="/register" component={RegistrationPage} />
      <AuthenticatedRoute path="/profile" component={ProfilePage} />
    </Route>
  </Router>
),
  document.getElementById('app-container')
);
