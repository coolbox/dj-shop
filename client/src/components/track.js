import React, { Component } from 'react';
import format from "format-duration";

class Track extends Component {
  render() {
    const track = this.props.track
    const trackTime = format(track.duration_ms, { leading: true })
    const artistNames = track.artists.map((artist, i) => (
      artist.name
    )).join(', ')

    return (
      <div>
        <img
          src={track.album.images[0].url}
          alt={`${track.name} - ${artistNames} artwork`}
          width='100'
          height='100'
        />
        <p>{track.name} - {artistNames} <small>({trackTime})</small></p>
        <p>Search for track</p>
        <ul>
          <li>
            <a
              href={track.itunes_url}
              title={`${track.name} - ${artistNames} iTunes link`}
              target='_blank'
              rel="noopener noreferrer"
            >iTunes</a>
          </li>
          <li>
            <a
              href='#'
              search={`${track.name} ${artistNames}`}
              type='amzn'
              title={`${track.name} - ${artistNames} Amazon link`}
              target='_blank'
              rel="noopener noreferrer"
            >Amazon</a>
          </li>
          <li>
            <a
              href={`https://www.junodownload.com/search/?q[all][]=${track.name} ${artistNames}`}
              title={`${track.name} - ${artistNames} Junodownload link`}
              target='_blank'
              rel="noopener noreferrer"
            >Junodownload</a>
          </li>
          <li>
            <a
              href={track.href}
              title={`${track.name} - ${artistNames} Spotify link`}
              target='_blank'
              rel="noopener noreferrer"
            >Spotify</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Track;
