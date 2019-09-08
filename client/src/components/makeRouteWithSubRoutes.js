import React, { Component } from 'react';
import { Route } from "react-router-dom";

class MakeRouteWithSubRoutes extends Component {
  render() {
    let route = this.props;

    return (
      <Route
        path={route.path}
        render={props => (
          <route.component {...props} routes={route.routes} />
        )}
      />
    )
  }
}

export default MakeRouteWithSubRoutes;
