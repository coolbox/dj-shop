import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Breadcrumbs extends Component {
  render() {
    const playlist = this.props.playlist
    return (
      <ul className='breadcrumbs'>
        <li>
          <Link to='/playlists'>Playlists</Link>
        </li>
        <li>
          <Link
            to={`/playlists/${playlist.id}`}
            title={playlist.name}>
            {playlist.name}
          </Link>
        </li>
      </ul>
    )
  }
}

export default Breadcrumbs;
