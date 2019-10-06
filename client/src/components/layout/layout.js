import React, { Component } from 'react';
import { NavBar } from '../navBar';
import { Footer } from '../footer';

function AppLayout(PageComponent) {
  class Layout extends Component {
    render() {
      return (
        <article className='pageContent'>
          <NavBar {...this.props} />
          <PageComponent {...this.props} />
          <Footer {...this.props} />
        </article>
      );
    }
  }

  return Layout;
}

export default AppLayout;
