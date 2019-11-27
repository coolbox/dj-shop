import React, { Component } from 'react';
import { Switch } from "react-router-dom";

import WithAuth from 'components/withAuth';
import MakeRouteWithSubRoutes from 'components/makeRouteWithSubRoutes';

import { Home } from 'views/Home';
import { Login } from 'views/Login';
import { NoMatch } from 'views/NoMatch';
import { Playlists } from 'views/Playlists';
import { Playlist } from 'views/Playlist';

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
          authenticate: true
        },
        {
          path: '/playlists/:playlistId',
          component: Playlist,
          authenticate: true
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
