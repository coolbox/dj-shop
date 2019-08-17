import React, { Component } from 'react';
import format from "format-duration";

class Track extends Component {
  render() {
    const track = this.props.track
    const trackTime = format(track.duration_ms, { leading: true })
    return (
      <div>
        <img
          src={track.spotify_image_url}
          alt={`${track.track_name} - ${track.artist_name} artwork`}
          width='100'
          height='100'
        />
        <p>{track.track_name} - {track.artist_name} <small>({trackTime})</small></p>
        <p>Search for track</p>
        <ul>
          <li>
            <a
              href={track.itunes_url}
              title={`${track.track_name} - ${track.artist_name} iTunes link`}
              target='_blank'
            >iTunes</a>
          </li>
          <li>
            <a
              href='#'
              search={`${track.track_name} ${track.artist_name}`}
              type='amzn'
              title={`${track.track_name} - ${track.artist_name} Amazon link`}
              target='_blank'
            >Amazon</a>
          </li>
          <li>
            <a
              href={`https://www.junodownload.com/search/?q[all][]=${track.track_name} ${track.artist_name}`}
              title={`${track.track_name} - ${track.artist_name} Junodownload link`}
              target='_blank'
            >Junodownload</a>
          </li>
          <li>
            <a
              href={track.spotify_url}
              title={`${track.track_name} - ${track.artist_name} Spotify link`}
              target='_blank'
            >Spotify</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Track;
