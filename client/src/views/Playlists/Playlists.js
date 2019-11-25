import React, { Component } from 'react';
import './index.scss';
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
      <div className='wrapper--vertical'>
        <h1>Your playlists</h1>
        <ul className='list'>
          {
            this.state.playlists.map(
              (playlist, index) =>
                <li key={playlist.id}>
                  <div className='list-artwork'>
                    <Link to={`${this.props.match.url}/${playlist.id}`}>
                      <img
                        src={playlist.cover_url}
                        alt='{playlist.name}'
                      />
                    </Link>
                  </div>
                  <div className='list-content'>
                    <div className='col-row'>
                      <h2>{playlist.name}</h2>
                      <h3>Created by: <span>{playlist.owner}</span></h3>
                    </div>
                    <div className='col-row'>
                      <Link
                        className='button'
                        to={`${this.props.match.url}/${playlist.id}`}
                      >
                        {playlist.track_count} {pluralize('song', playlist.track_count)}
                      </Link>
                    </div>
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
