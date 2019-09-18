import React, { Component } from 'react';
import { Switch } from "react-router-dom";

import WithAuth from './withAuth';
import MakeRouteWithSubRoutes from './makeRouteWithSubRoutes';

import { Home } from '../views/Home';
import { Playlists } from '../views/Playlists';
import { Playlist } from '../views/Playlist';
import { NoMatch } from '../views/NoMatch';
import { Login } from '../views/Login';
import Footer from './footer';

class Routes extends Component {
  constructor () {
    super()

    this.state = {
      routes: [
        {
          path: '/',
          exact: true,
          component: Home
        },
        {
          path: '/login',
          exact: true,
          component: Login
        },
        {
          path: '/playlists',
          exact: true,
          component: Playlists,
          routes: [
            {
              path: '/playlists/:playlist_id',
              component: Playlist
            }
          ]
        },
        {
          path: '/:no_match',
          component: NoMatch
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <Switch>
          {
            this.state.routes.map(
              (route, index) => (
                <MakeRouteWithSubRoutes key={index} {...route} />
              )
            )
          }
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default WithAuth(Routes);
