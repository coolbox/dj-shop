import React, { Component } from 'react';
import format from 'format-duration';
const itunes = require('itunes-helper')

class Track extends Component {
  constructor () {
    super()
    this.state = {
      track: false
    }
    this.setAttributes = this.setAttributes.bind(this)
    this.getItunesUrl = this.getItunesUrl.bind(this)
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

  render() {
    const track = this.state

    if (track){
      return (
        <div>
          <img
            src={track.album_image}
            alt={`${track.name} - ${track.artist_names} artwork`}
            width='100'
            height='100'
          />
          <p>{track.name} - {track.artist_names} <small>({track.track_time})</small></p>
          <p>Search for track</p>
          <ul>
            { track.itunes_url && (
              <li>
                <a
                  href={track.itunes_url}
                  title={`${track.name} - ${track.artist_names} iTunes link`}
                  target='_blank'
                  rel="noopener noreferrer"
                >iTunes</a>
              </li>
            ) }
            <li>
              <a
                href='#'
                search={`${track.name} ${track.artist_names}`}
                type='amzn'
                title={`${track.name} - ${track.artist_names} Amazon link`}
                target='_blank'
                rel="noopener noreferrer"
              >Amazon</a>
            </li>
            <li>
              <a
                href={`https://www.junodownload.com/search/?q[all][]=${track.name} ${track.artist_names}`}
                title={`${track.name} - ${track.artist_names} Junodownload link`}
                target='_blank'
                rel="noopener noreferrer"
              >Junodownload</a>
            </li>
            <li>
              <a
                href={track.spotify_url}
                title={`${track.name} - ${track.artist_names} Spotify link`}
                target='_blank'
                rel="noopener noreferrer"
              >Spotify</a>
            </li>
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

export default Track;
