import React, { Component } from 'react';
import { Layout } from 'components/layout';

class Home extends Component {
  componentDidMount () {
    let vid = document.getElementById("heroVid");
    vid.playbackRate = 0.7;
  }

  render() {
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
            <ul className="carousel margin-bottom--lg">
              <li className="carousel-card">
                <img src='/images/album-test.jpg' alt='Album artwork' />
                <h4>Hello World</h4>
                <p>Foo bar</p>
              </li>
              <li className="carousel-card">
                <img src='/images/album-test.jpg' alt='Album artwork' />
                <h4>Hello World</h4>
                <p>Foo bar</p>
              </li>
              <li className="carousel-card">
                <img src='/images/album-test.jpg' alt='Album artwork' />
                <h4>Hello World</h4>
                <p>Foo bar</p>
              </li>
              <li className="carousel-card">
                <img src='/images/album-test.jpg' alt='Album artwork' />
                <h4>Hello World</h4>
                <p>Foo bar</p>
              </li>
            </ul>
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
