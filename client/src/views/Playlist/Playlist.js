import React, { Component } from 'react';
import './index.scss';
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
          <h1>{playlist.name}</h1>
          { loadingTracks && (<h3>Loading…</h3>) }
          <ul className='list'>
            {tracks.map((trackObject, index) => (
              <Track
                key={`track-${trackObject.track.id}-${index}`}
                track={trackObject.track}
              />
            ))}
          </ul>
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
