import React, { Component } from 'react';
import format from 'format-duration';
import AuthHelperMethods from 'components/authHelperMethods';

const itunes = require('itunes-helper')
const Auth = new AuthHelperMethods();

class Track extends Component {
  constructor () {
    super()
    this.state = {
      track: false
    }
    this.setAttributes = this.setAttributes.bind(this)
    this.getItunesUrl = this.getItunesUrl.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    this.setAttributes()
  }

  setAttributes () {
    const track = this.props.track
    const artistNames =
      track.artists.map((artist, i) => (
        artist.name
      )).join(', ')

    this.setState({
      track: true,
      artist_names: artistNames,
      name: track.name,
      track_time: format(track.duration_ms, { leading: true }),
      album_image: track.album.images[0].url,
      itunes_url: this.getItunesUrl(artistNames, track.name),
      spotify_url: track.href
    })
  }

  getItunesUrl (artist_name, track_name) {
    itunes.search({
        term: `${artist_name} ${track_name}`,
        media: 'music',
        limit: 1,
    })
    .then(res => {
        if(res.resultCount > 0){
          this.setState({
            itunes_url: res.results[0].trackViewUrl
          })
        }
      }
    )
  }

  fetch (endpoint, body) {
    const headers =  {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${Auth.getToken()}`
    }

    return window.fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  trackClick (trackProvider) {
    let track = this.state
    this.fetch('/api/v1/clicks', {
      artist_names: track.artist_names,
      name: track.name,
      track_time: track.track_time,
      album_image: track.album_image,
      itunes_url: track.itunes_url,
      spotify_url: track.spotify_url,
      trackProvider: trackProvider
    })
  }

  handleClick (event) {
    let trackProvider = event.target.getAttribute('data-track-provider');
    this.trackClick(trackProvider)
  }

  render() {
    const track = this.state

    if (track){
      return (
        <li>
          <div className='list-artwork'>
            <img
              src={track.album_image}
              alt={`${track.name} - ${track.artist_names} artwork`}
            />
          </div>
          <div className='list-content'>
            <div className='col-row'>
              <h2>{track.artist_names}</h2>
              <h3>{track.name} ({track.track_time})</h3>
            </div>
            <div className='col-row'>
              <ul className='button-holder'>
                { track.itunes_url && (
                  <li className='button'>
                    <a
                      href={track.itunes_url}
                      onClick={this.handleClick}
                      title={`${track.name} - ${track.artist_names} iTunes link`}
                      target='_blank'
                      rel="noopener noreferrer"
                      data-track-provider='itunes'
                    >
                      <img
                        className='logo-icon'
                        src='/icons/iconmonstr-apple-os-1.svg'
                        alt='Apple music'
                      />
                    </a>
                  </li>
                ) }
                <li className='button button--amazon'>
                  <a
                    href='/'
                    onClick={this.handleClick}
                    search={`${track.name} ${track.artist_names}`}
                    type='amzn'
                    title={`${track.name} - ${track.artist_names} Amazon link`}
                    target='_blank'
                    rel="noopener noreferrer"
                    data-track-provider='amazon'
                  >
                    <img
                      className='logo-icon'
                      src='/icons/iconmonstr-amazon-1.svg'
                      alt='Amazon music'
                    />
                  </a>
                </li>
                <li className='button button--juno'>
                  <a
                    href={`https://www.junodownload.com/search/?q[all][]=${track.name} ${track.artist_names}`}
                    onClick={this.handleClick}
                    title={`${track.name} - ${track.artist_names} Junodownload link`}
                    target='_blank'
                    rel="noopener noreferrer"
                    data-track-provider='junodownload'
                  >Juno</a>
                </li>
                <li className='button button--spotify'>
                  <a
                    href={track.spotify_url}
                    onClick={this.handleClick}
                    title={`${track.name} - ${track.artist_names} Spotify link`}
                    target='_blank'
                    rel="noopener noreferrer"
                    data-track-provider='spotify'
                  >
                  <img
                    className='logo-icon'
                    src='/icons/iconmonstr-spotify-1.svg'
                    alt='Spotify'
                  />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      )
    } else {
      return (
        <h1>Loading…</h1>
      )
    }
  }
}

export default Track;
