import React, { Component } from 'react';
import { Layout } from '../../components/layout';

import './index.css';

class Home extends Component {
  render() {
    return (
      <div>
        <div className='hero'>
          <h1>Find your tracks in 1 click</h1>
        </div>
        <div className='steps'>
          <h2>Prepare your next set, faster</h2>
          <ul>
            <li>

            </li>
            <li>

            </li>
            <li>

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
