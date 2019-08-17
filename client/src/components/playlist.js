import React, { Component } from 'react';
import Track from '.././components/track';
import Breadcrumbs from '.././components/breadcrumbs';

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
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getPlaylist () {
    this.fetch('/api/v1/playlists/' + this.props.match.params.playlist_id)
      .then(playlist => {
        this.setState({playlist: playlist})
      })
  }

  render() {
    const playlist = this.state.playlist
    if (playlist){
      const songString = playlist.tracks.length > 1 ? "songs" : "song"

      return (
        <div className='playlist'>
          <Breadcrumbs playlist={playlist} />
          <h3>Playlist</h3>
          <h1>{playlist.name}</h1>
          <img
            src={playlist.cover_url}
            alt={playlist.name}
            width='250'
            height='250'
          />
          <h2>Tracks</h2>
          <h2>{playlist.tracks.length} {songString}</h2>
          <ol>
            {playlist.tracks.map((track, i) => (
              <li key={track.id}>
                <Track track={track} />
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

export default Playlist;
