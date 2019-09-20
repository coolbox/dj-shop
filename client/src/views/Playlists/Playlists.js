import React, { Component } from 'react';
import { Layout } from '../../components/layout';
import { Link } from "react-router-dom";
import pluralize from "pluralize";

import AuthHelperMethods from '../../components/authHelperMethods';

const Auth = new AuthHelperMethods();

class Playlists extends Component {
  constructor (props) {
    super(props)
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
    let headers =  {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${Auth.getToken()}`
    }

    return window.fetch(endpoint, {
        method: 'GET',
        headers: headers
      })
      .then(response => response.json())
      .catch(error => console.log('Error: ', error))
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

        if(this.state.playlists.length < this.state.total){
          const newOffset = this.state.offset + this.state.limit
          this.getPlaylists(newOffset)
        }
      })
  }

  render() {
    return (
      <div>
        <h1>Playlists</h1>
        <ul className='playlists'>
          {
            this.state.playlists.map(
              (playlist, index) =>
                <li key={playlist.id} className='playlist'>
                  <Link to={`${this.props.match.url}/${playlist.id}`}>
                    <div
                      className='top'
                      style={{backgroundImage: `url(${playlist.cover_url})`}}
                    >
                    </div>
                  </Link>
                  <div className='bottom'>
                    <Link to={`${this.props.match.url}/${playlist.id}`}>
                      <h1>{playlist.name}</h1>
                    </Link>
                    <h3>
                      {playlist.track_count} {pluralize('song', playlist.track_count)}
                    </h3>
                  </div>
                </li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default Layout(Playlists);
