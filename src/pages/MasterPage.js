import React from 'react';
import DocumentTitle from 'react-document-title';

import Header from './Header';

const MasterPage = function MasterPage(props) {
  return (
    <DocumentTitle title="My React App">
      <div className="MasterPage">
        <Header />
        {props.children}
      </div>
    </DocumentTitle>
  );
};

MasterPage.propTypes = {
  children: React.PropTypes.element,
};

module.exports = MasterPage;
