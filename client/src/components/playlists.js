import React, { Component } from 'react';
import { Link } from "react-router-dom";
import pluralize from "pluralize";

class Playlists extends Component {
  constructor () {
    super()
    this.state = {
      playlists: [],
      offset: 0
    }
    this.getPlaylists = this.getPlaylists.bind(this)
  }

  componentDidMount () {
    this.getPlaylists(this.state.offset)
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

  getPlaylists (offset) {
    this.fetch('/api/v1/playlists?offset=' + offset)
      .then(response => {
        this.setState({
          offset: response.offset,
          limit: response.limit,
          playlists: this.state.playlists.concat(response.playlists),
          next: response.next,
          total: response.total
        })

        console.log(this.state.playlists.length, this.state.total)
        if(this.state.playlists.length < this.state.total){
          const newOffset = this.state.offset + this.state.limit
          this.getPlaylists(newOffset)
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
                <h1>{playlist.name}</h1>
              </Link>
                <h3>{playlist.track_count} {pluralize('song', playlist.track_count)}</h3>
              <Link to={`/playlists/${playlist.id}`}>
                <img
                  src={playlist.cover_url}
                  alt={playlist.name}
                  width='250'
                  height='250'
                />
              </Link>
            </li>
          )
        })}
     </ul>
    )
  }
}

export default Playlists;
