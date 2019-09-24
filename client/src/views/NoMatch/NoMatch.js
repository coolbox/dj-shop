import React, { Component } from 'react';
import Layout from '../../components/layout/layout';

class NoMatch extends Component {
  render() {
    return (
      <h1>No Match - 404?</h1>
    )
  }
}

export default Layout(NoMatch);
