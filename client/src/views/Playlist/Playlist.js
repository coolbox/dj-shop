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
      const loadingTracks = tracks.length !== playlist.tracks.total
      // const loadingTracks = tracks.length !== playlist.track_count

      return (
        <div className='wrapper--vertical playlist'>
          <Breadcrumbs />
          <h1>{playlist.name}</h1>
          { loadingTracks && (
            <h3 className='padding--sides--m bigger'>
              Loading tracks…
            </h3>
          ) }
          <ul className='list margin--bottom--m'>
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
        <div className='wrapper--vertical playlist'>
          <Breadcrumbs />
          <h1>Loading…</h1>
        </div>
      )
    }
  }
}

export default Layout(Playlist);
