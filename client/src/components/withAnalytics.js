import React, { Component } from 'react';
import ReactGA from "react-ga";

const withAnalytics = (AnalyticsComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
    }

    componentDidMount() {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }

    render() {
      return (
        <AnalyticsComponent {...this.props} />
      );
    }
  }
};

export default withAnalytics;
