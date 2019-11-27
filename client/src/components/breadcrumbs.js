import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Breadcrumbs extends Component {
  render() {
    return (
      <ul className='breadcrumbs'>
        <li className='breadcrumb'>
          <p><Link to='/playlists'>Your playlists</Link></p>
        </li>
        <li className='breadcrumb'>
          <p>Playlist</p>
        </li>
      </ul>
    )
  }
}

export default Breadcrumbs;
