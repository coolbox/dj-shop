import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Playlists from './components/playlists';
import Playlist from './components/playlist';
import Footer from './components/footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <form>
            <button formAction="http://localhost:5100/api/v1/login/new">Log in</button>
          </form>

          <Route exact path={`/playlists`} component={Playlists} />
          <Route path={`/playlists/:playlist_id`} component={Playlist} />
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
