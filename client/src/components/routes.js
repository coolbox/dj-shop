import React, { Component } from 'react';
import { Switch } from "react-router-dom";

import WithAuth from './withAuth';
import MakeRouteWithSubRoutes from './makeRouteWithSubRoutes';

import { Home } from '../views/home';
import { Playlists } from '../views/playlists';
import { Playlist } from '../views/playlist';
import { NoMatch } from '../views/noMatch';
import { Login } from '../views/login';

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
          component: Playlists
        },
        {
          path: '/playlists/:playlistId',
          component: Playlist,
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
      </div>
    )
  }
}

export default WithAuth(Routes);
