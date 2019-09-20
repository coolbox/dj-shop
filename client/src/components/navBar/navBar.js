import React, { Component } from 'react';
import AuthHelperMethods from '../authHelperMethods';

import './index.css';

const Auth = new AuthHelperMethods();

class NavBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      navItems: [
        {
          path: '/',
          title: 'Home'
        },
        {
          path: '/playlists',
          title: 'Playlists',
          authenticated: true
        }
      ]
    }
    this.logOutButton = this.logOutButton.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  logOutButton () {
    if(!Auth.loggedIn()){
      return null;
    }

    return (
      <li>
        <button onClick={this.handleLogout}>Log out</button>
      </li>
    )
  }

  handleLogout (event) {
    event.preventDefault();
    Auth.logout()
    this.props.history.replace('/login');
  }

  render () {
    return (
      <nav>
        <ul>
          {
            this.state.navItems.map(function(link, index){
              if (link.authenticated){
                if (Auth.loggedIn()) {
                  return(
                    <li key={index}>
                      <a href={link.path} title={link.title}>{link.title}</a>
                    </li>
                  )
                } else {
                  return null;
                }
              } else {
                return (
                  <li key={index}>
                    <a href={link.path} title={link.title}>{link.title}</a>
                  </li>
                )
              }
            })
          }
          {this.logOutButton()}
        </ul>
      </nav>
    )
  }
}

export default NavBar;
