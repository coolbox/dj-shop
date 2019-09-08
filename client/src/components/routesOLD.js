import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Home } from '../views/Home';
import { Playlists } from '../views/Playlists';
import { NoMatch } from '../views/NoMatch';
// import LoginButtons from './login_buttons';
// import Playlist from './playlist';
// import Footer from './footer';
import qs from "query-string";

class Routes extends Component {
  // constructor () {
  //   super()
  //   this.state = {
  //     jwt: sessionStorage.getItem('jwt')
  //   }
  //   this.loggedIn = this.loggedIn.bind(this)
  // }
  //
  // loggedIn () {
  //   if(this.props.location.search){
  //     console.log("logged in")
  //     return this.props.location.search.includes("token=") === true
  //   } else {
  //     console.log("not logged in")
  //     return false
  //   }
  // }
  //
  // storeToken () {
  //   console.log("Hello: ", this.props)
  //   if(this.props.location){
  //     const jwt =
  //       qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).token
  //     sessionStorage.setItem("jwt", jwt)
  //   }
  // }
  //
  componentDidMount () {
    console.log("Hello: ", this.props)
    // this.storeToken();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path='/playlists' component={Playlists} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
    // return (
    //   <div className="App">
    //     <Route exact path="/" render={() => (
    //       this.loggedIn === true ? (
    //         console.log("Yes"),
    //         <Redirect to="/playlists" />
    //       ) : (
    //         console.log("No"),
    //         <LoginButtons />
    //       )
    //     )} />
    //     <Route
    //       exact
    //       path={`/playlists`}
    //       render={props => <Playlists jwt={this.state.jwt} />}
    //     />
    //     <Route path={`/playlists/:playlist_id`} component={Playlist} />
    //   </div>
    //   <Footer />
    // )
  }
}

export default Routes;
