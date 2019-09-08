import React, { Component } from 'react';
import { Switch } from "react-router-dom";
import MakeRouteWithSubRoutes from './makeRouteWithSubRoutes';
import { Home } from '../views/Home';
import { Playlists } from '../views/Playlists';
import { Playlist } from '../views/Playlist';
import { NoMatch } from '../views/NoMatch';

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
      </div>
    )
  }
}

export default Routes;
