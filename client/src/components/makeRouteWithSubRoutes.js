import React, { Component } from 'react';
import { Route } from "react-router-dom";

import WithAnalytics from 'components/withAnalytics';

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

export default WithAnalytics(MakeRouteWithSubRoutes);
