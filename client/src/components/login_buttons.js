import React, { Component } from 'react';

class LoginButtons extends Component {
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
