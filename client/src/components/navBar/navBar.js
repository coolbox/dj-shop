import React, { Component } from 'react';
import AuthHelperMethods from '../authHelperMethods';

const Auth = new AuthHelperMethods();

class NavBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      navItems: [
        {
          path: '/login',
          title: 'Login'
        }
      ]
    }
    this.logOutButton = this.logOutButton.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  menuButton () {
    if(!Auth.loggedIn()){
      return null;
    }

    return (
      <li>
        <a href='/' title='Cue - Menu'>
          <img src='/icons/menu.svg' alt='Menu' />
        </a>
      </li>
    )
  }

  logOutButton () {
    if(!Auth.loggedIn()){
      return null;
    }

    return (
      <li>
        <button
          className='btn-link'
          onClick={this.handleLogout}>
          <img src='/icons/log-out.svg' alt='Log out' />
        </button>
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
          {this.menuButton()}
          <li className='nav-logo'>
            <a href='/' title='Cue - Home'>
              <div className='logo'>
                <div className='logo-shape'></div>
                <span>Cue</span>
              </div>
            </a>
          </li>
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
                if (Auth.loggedIn()) {
                  return null;
                } else {
                  return (
                    <li key={index}>
                      <a href={link.path} title={link.title}>{link.title}</a>
                    </li>
                  )
                }
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
