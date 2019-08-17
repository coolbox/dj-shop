import React, { Component } from 'react';

class Footer extends Component {
  render() {
    const date = new Date()
    const year = date.getFullYear()
    return (
      <footer>
        <ul>
          <li>
            <p>By <a href="https://peteroo.me" title="Pete Roome">Pete Roome</a></p>
          </li>
          <li>
            <p>Copyright {year}</p>
          </li>
        </ul>
      </footer>
    )
  }
}

export default Footer;
