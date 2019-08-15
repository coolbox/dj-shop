import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

class Playlists extends Component {
  constructor () {
    super()
    this.state = {
      playlists: []
    }
    this.getPlaylists = this.getPlaylists.bind(this)
  }

  componentDidMount () {
    this.getPlaylists()
  }

  fetch (endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getPlaylists () {
    this.fetch('/api/v1/playlists')
      .then(playlists => {
        if (playlists.length) {
          this.setState({playlists: playlists})
        }
      })
  }

  render() {
    return (
      <ul>
        {this.state.playlists.map(function (playlist, i) {
          return (
            <li key={playlist.id}>
              <Link to={`/playlists/${playlist.id}`}>
                <img
                  src={playlist.cover_url}
                  alt={playlist.name}
                  width='250'
                  height='250'
                />
                <h1>{playlist.name}</h1>
              </Link>
            </li>
          )
        })}
     </ul>
    )
  }
}

export default Playlists;
