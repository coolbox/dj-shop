import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'
import AuthHelperMethods from '../authHelperMethods';

const Auth = new AuthHelperMethods();

class NavBar extends Component {
  constructor (props) {
    super(props)

    this.logOutButton = this.logOutButton.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  logOutButton () {
    if(!Auth.loggedIn()){
      return null;
    }

    return (
      <button
        className='btn-link'
        onClick={this.handleLogout}>
        <span role="img" aria-label="waving hand">👋</span> Log out
      </button>
    )
  }

  handleLogout (event) {
    event.preventDefault();
    Auth.logout()
    this.props.history.replace('/login');
  }

  render () {
    return (
      <div>
        <header>
          <Menu
            pageWrapId={'page-wrap'}
            outerContainerId={'outer-container'}
            customBurgerIcon={ <img src="/icons/menu.svg" alt='Menu'/> }
          >
            <ul>
              <li><span role="img" aria-label="headphones">🎧</span> <Link to='/playlists'>Your playlists</Link></li>
              <li>{this.logOutButton()}</li>
            </ul>
          </Menu>
          <div className='logo-holder'>
            <a href='/' title='Cue - Home'>
              <div className='logo'>
                <div className='logo-shape'></div>
                <span>Cue</span>
              </div>
            </a>
          </div>
        </header>
      </div>
    )
  }
}

export default NavBar;
