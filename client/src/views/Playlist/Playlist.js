import React, { Component } from 'react';
import { Layout } from '../../components/layout';

import Track from '../../components/track';
import Breadcrumbs from '../../components/breadcrumbs';
import AuthHelperMethods from '../../components/authHelperMethods';

const Auth = new AuthHelperMethods();

class Playlist extends Component {
  constructor () {
    super()
    this.state = {
      playlist: null
    }
    this.getPlaylist = this.getPlaylist.bind(this)
  }

  componentDidMount () {
    this.getPlaylist()
  }

  fetch (endpoint) {
    const headers =  {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${Auth.getToken()}`
    }

    return window.fetch(endpoint, {
        method: 'GET',
        headers: headers
      })
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getPlaylist () {
    this.fetch('/api/v1/playlists/' + this.props.match.params.playlistId)
      .then(playlist => {
        this.setState({playlist: playlist})
      })
  }

  render() {
    const playlist = this.state.playlist

    if (playlist){
      const tracks = playlist.tracks.items
      const songString = tracks.length > 1 ? 'songs' : 'song'
      const loadingTracks = tracks.length !== playlist.track_count

      return (
        <div className='playlist'>
          <Breadcrumbs playlist={playlist} />
          <h3>Playlist</h3>
          <h1>{playlist.name}</h1>
          <img
            src={playlist.images[0].url}
            alt={playlist.name}
            width='250'
            height='250'
          />
          <h2>Tracks</h2>
          <h2>{tracks.length} {songString}</h2>
          { loadingTracks && (<h3>Loading…</h3>) }
          <ol>
            {tracks.map((trackObject, i) => (
              <li key={trackObject.track.id}>
                <Track
                  track={trackObject.track}
                />
              </li>
            ))}
          </ol>
        </div>
      )
    } else {
      return (
        <h1>Loading…</h1>
      )
    }
  }
}

export default Layout(Playlist);
