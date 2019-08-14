import React, { Component } from 'react';
import Playlists from './components/playlists';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <form>
          <button formAction="http://localhost:5100/api/v1/login/new">Log in</button>
        </form>
        <Playlists />
      </div>
    );
  }
}

export default App;
