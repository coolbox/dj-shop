import React, { Component } from 'react';
import AuthHelperMethods from '../../components/authHelperMethods';

const Auth = new AuthHelperMethods();

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout (event) {
    event.preventDefault();
    Auth.logout()
    this.props.history.replace('/login');
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <button
            formAction="http://localhost:5100/api/v1/login/new">
            Log in
          </button>
        </form>
        <button onClick={this.handleLogout}>Log out</button>
      </div>
    );
  }
}

export default Login;
