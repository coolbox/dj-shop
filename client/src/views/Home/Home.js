import React, { Component } from 'react';
import { Layout } from 'components/layout';

class Home extends Component {
  constructor () {
    super()
    this.state = {
      recentTracks: null
    }
  }

  componentDidMount () {
    this.getRecentTracks()

    let vid = document.getElementById("heroVid");
    vid.playbackRate = 0.7;
  }

  fetch (endpoint) {
    const headers =  {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    return window.fetch(endpoint, {
        method: 'GET',
        headers: headers
      })
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getRecentTracks () {
    this.fetch('/api/v1/clicks/')
      .then(recentTracks => {
        this.setState({recentTracks: recentTracks})
      })
  }

  render() {
    const recentTracks = this.state.recentTracks

    return (
      <div>
        <div className='hero'>
          <video id='heroVid' loop muted autoPlay poster='/images/club-scene.jpg'>
            <source src='/videos/club-scene.mp4' type='video/mp4' />
          </video>
          <div className='hero-content'>
            <div className='wrapper--vertical text--center'>
              <h1>Spotify playlists to your decks, faster.</h1>
              <a href="/" className='pill' title='Log in'>Get started</a>
            </div>
          </div>
        </div>
        <div className='wrapper text--center'>
          <h2 className='font-size--lg margin-bottom--lg'>Prepare your next DJ set</h2>
          <ul className='steps margin-bottom--lg'>
            <li>
              <span className='step-number font--family-1'>1</span>
              <h3>Create your Spotify playlist</h3>
            </li>
            <li>
              <span className='step-number font--family-1'>2</span>
              <h3>Login</h3>
            </li>
            <li>
              <span className='step-number font--family-1'>3</span>
              <h3>Buy your tracks</h3>
            </li>
          </ul>
          <a
            href='/'
            className='pill'
            title='Log in'
          >Connect to Spotify</a>
        </div>
        <div className='wrapper--vertical text--center bkg-color--jumbo'>
          <h3 className='color--jumbo font--family-1 font-size--md margin-bottom--lg'>
            Recently purchased
          </h3>
          <div className="carousel-wrap">
            { recentTracks && (
              <ul className="carousel margin-bottom--lg">
                {recentTracks.map((trackObject, index) => (
                  <li className="carousel-card" key={index}>
                    <img
                      src={trackObject.album_image}
                      alt={`${trackObject.name} - ${trackObject.artist_names} artwork`}
                    />
                    <h4>{trackObject.name}</h4>
                    <p>{trackObject.artist_names}</p>
                  </li>
                ))}
              </ul>
            ) }
          </div>
          <a
            href='/'
            className='pill'
            title='Log in'
          >Connect to Spotify</a>
        </div>
      </div>
    )
  }
}

export default Layout(Home);
