import React, { Component } from 'react';
import _ from 'underscore';
import Track from '.././components/track';
import Breadcrumbs from '.././components/breadcrumbs';

class Playlist extends Component {
  constructor () {
    super()
    this.state = {
      playlist: null,
      poll_count: 0
    }
    this.getPlaylist = this.getPlaylist.bind(this)
    this.itunesUrl = this.itunesUrl.bind(this)
  }

  componentDidMount () {
    this.getPlaylist()
  }

  fetch (endpoint) {
    const jwt = sessionStorage.getItem('jwt');
    const headers =  {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${jwt}`
    }

    return window.fetch(endpoint, {
        method: 'GET',
        headers: headers
      })
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getPlaylist () {
    this.fetch('/api/v1/playlists/' + this.props.match.params.playlist_id)
      .then(response => {
        this.setState(response)
      })
  }

  itunesUrl (track_id) {
    console.log(track_id)
    var track_urls = _.filter (this.state.track_urls, function(track_url) {
      return track_url.spotify_id = track_id
    })
    console.log(track_urls)
    // return track_urls[0].itunes_url
  }

  render() {
    const playlist = this.state.playlist

    if (playlist){
      console.log(playlist)
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
                  itunesUrl={this.itunesUrl(trackObject.track.id)}
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

export default Playlist;
