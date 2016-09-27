import React from 'react';
import { Link } from 'react-router';
import { LoginLink } from 'react-stormpath';
import DocumentTitle from 'react-document-title';

import Header from './Header';

const MasterPage = function MasterPage(props) {
  return (
    <DocumentTitle title="My React App">
      <div className="MasterPage">
        <Header />
        { props.children }
      </div>
    </DocumentTitle>
  );
};

module.exports = MasterPage;
