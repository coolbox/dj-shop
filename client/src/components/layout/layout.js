import React, { Component } from 'react';
import { NavBar } from '../navBar';
import { Footer } from '../footer';

function AppLayout(PageComponent) {
  class Layout extends Component {
    render() {
      return (
        <div id='outer-container'>
          <NavBar {...this.props} />
          <main id='page-wrap'>
            <PageComponent {...this.props} />
          </main>
          <Footer {...this.props} />
        </div>
      );
    }
  }

  return Layout;
}

export default AppLayout;
