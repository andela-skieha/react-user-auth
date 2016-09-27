import React from 'react';
import { Link } from 'react-router';
import { LoginLink, LogoutLink, Authenticated, NotAuthenticated } from 'react-stormpath';

const Header = function Header() {
  return (
    <nav className="navbar navbar-default navbar-static-top">
      <div className="container">
        <div id="navbar-collapse" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <NotAuthenticated>
              <li>
                <LoginLink />
              </li>
            </NotAuthenticated>
            <NotAuthenticated>
              <li>
                <Link to="/register">Create Account</Link>
              </li>
            </NotAuthenticated>
          </ul>
        </div>
      </div>
    </nav>
  );
};

module.exports = Header;
