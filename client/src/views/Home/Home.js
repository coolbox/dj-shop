import React, { Component } from 'react';

class Home extends Component {
  render() {
    console.log(this.props.match)
    return (
      <h1>Home</h1>
    )
  }
}

export default Home;
