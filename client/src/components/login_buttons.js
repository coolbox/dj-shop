import React, { Component } from 'react';
import qs from "query-string";

class LoginButtons extends Component {
  storeToken () {
    const jwt =
      qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).token
    sessionStorage.setItem("jwt", jwt)
  }

  componentDidMount () {
    this.storeToken();
  }

  render() {
    return (
      <form>
        <button
          formAction="http://localhost:5100/api/v1/login/new">
          Log in
        </button>
      </form>
    )
  }
}

export default LoginButtons;
