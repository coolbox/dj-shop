import React, { Component } from 'react';
import { Layout } from '../../components/layout';

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
          <div className='heroContent'>
            <h1 className='large'>Spotify to your decks, <br /> faster.</h1>
          </div>
        </div>
        <div className='wrapper'>
          <h2>Prepare your next DJ set</h2>
          <ul className='steps'>
            <li>
              <h3>1. Create your playlist</h3>
            </li>
            <li>
              <h3>2. Login</h3>
            </li>
            <li>
              <h3>2. Buy your tracks</h3>
            </li>
          </ul>
        </div>
        <div class="bkg-image carousel-wrap">
          <ul class="carousel">
            <li class="carousel-card">
              <h4 class="quote font-align--center color--dark-grey margin--bottom--small">Hello World</h4>
              <p class="quote-author color--orange font-align--center">Foo bar</p>
            </li>
            <li class="carousel-card">
              <h4 class="quote font-align--center color--dark-grey margin--bottom--small">Hello World</h4>
              <p class="quote-author color--orange font-align--center">Foo bar</p>
            </li>
            <li class="carousel-card">
              <h4 class="quote font-align--center color--dark-grey margin--bottom--small">Hello World</h4>
              <p class="quote-author color--orange font-align--center">Foo bar</p>
            </li>
            <li class="carousel-card">
              <h4 class="quote font-align--center color--dark-grey margin--bottom--small">Hello World</h4>
              <p class="quote-author color--orange font-align--center">Foo bar</p>
            </li>
          </ul>
        </div>
        <div className='exampleTracks'>
          <h2>Recently purchased</h2>
        </div>
      </div>
    )
  }
}

export default Layout(Home);
