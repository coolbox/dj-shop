import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import AuthHelperMethods from '../authHelperMethods';

const Auth = new AuthHelperMethods();

class NavBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      menuItems: []
    }

    this.setMenuItems = this.setMenuItems.bind(this)
    this.logOutButton = this.logOutButton.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount () {
    this.setMenuItems()
  }

  setMenuItems () {
    if (Auth.loggedIn()){
      this.setState({
        menuItems: [
          {
            emoji: '🎧',
            emojiLabel: 'headphones',
            path: '/playlists',
            label: 'Your playlists'
          },
          {
            emoji: '👋',
            emojiLabel: 'waving hand',
            path: '/logout',
            label: 'Log out'
          }
        ]
      })
    } else {
      this.setState({
        menuItems: [{
          emoji: '👐',
          emojiLabel: 'open hands',
          path: '/login',
          label: 'Login'
        }]
      })
    }
  }

  logOutButton () {
    if(!Auth.loggedIn()){
      return null;
    }

    return (
      <button
        className='btn-link'
        onClick={this.handleLogout}>
        <span role='img' aria-label='waving hand'>👋</span> Log out
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
            customBurgerIcon={ <img src='/icons/menu.svg' alt='Menu'/> }
            customCrossIcon={ <img src='/icons/x.svg' alt='CLose menu' /> }
          >
            <ul>
              {
                this.state.menuItems.map(function(menuItem, index){
                  return(
                    <li key={index}>
                      <span role='img' aria-label={menuItem.emojiLabel}>{menuItem.emoji}</span> <Link to={menuItem.path}>{menuItem.label}</Link>
                    </li>
                  )
                })
              }
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
