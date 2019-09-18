import React, { Component } from 'react';

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
          title: 'Playlists'
        }
      ]
    }
  }

  render() {
    return (
      <ul>
        {
          this.state.navItems.map(
            (link, index) => (
              <li key={index}>
                <a href={link.path} title={link.title}>{link.title}</a>
              </li>
            )
          )
        }
      </ul>
    )
  }
}

export default NavBar;
