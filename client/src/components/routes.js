import React, { Component } from 'react';
import { Switch } from "react-router-dom";
import MakeRouteWithSubRoutes from './makeRouteWithSubRoutes';

import AuthHelperMethods from './authHelperMethods';
import WithAuth from './withAuth';

import { Home } from '../views/Home';
import { Playlists } from '../views/Playlists';
import { Playlist } from '../views/Playlist';
import { NoMatch } from '../views/NoMatch';

class Routes extends Component {
  constructor () {
    super()

    this.Auth = new AuthHelperMethods();
    this.state = {
      routes: [
        {
          path: '/',
          exact: true,
          component: Home
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

  _handleLogout () {
    this.Auth.logout()
    this.props.history.replace('/login');
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
