import React, { Component } from 'react';

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
    if (this.state.playlist){
      return (
        <h1>{this.state.playlist.name}</h1>
      )
    } else {
      return (
        <h1>Loading…</h1>
      )
    }
  }
}

export default Playlist;
