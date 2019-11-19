import React, { Component } from 'react';

class Footer extends Component {
  render() {
    const date = new Date()
    const year = date.getFullYear()
    return (
      <div className='wrapper bkg--black'>
        <footer>
          <ul>
            <li>
              <p>A <a href="http://peteroo.me" title="Tiny Tools">Tiny Tool</a></p>
            </li>
            <li>
              <p>Copyright {year}</p>
            </li>
          </ul>
        </footer>
      </div>
    )
  }
}

export default Footer;
