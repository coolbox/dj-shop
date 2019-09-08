import React, { Component } from 'react';
import MakeRouteWithSubRoutes from '../../components/makeRouteWithSubRoutes';

class Playlists extends Component {
  render() {
    return (
      <div>
        <h1>Playlists</h1>
        {
          this.props.routes.map(
            (route, index) => (
              <MakeRouteWithSubRoutes key={index} {...this.props.routes} />
            )
          )
        }
      </div>
    )
  }
}

export default Playlists;
// import React, { Component } from 'react';
// // import { Link, Redirect } from "react-router-dom";
// // import pluralize from "pluralize";
//
// class Playlists extends Component {
//   // constructor () {
//   //   super()
//   //   this.state = {
//   //     playlists: [],
//   //     offset: 0
//   //   }
//   //   this.getPlaylists = this.getPlaylists.bind(this)
//   // }
//   //
//   // componentDidMount () {
//   //   this.getPlaylists(this.state.offset)
//   // }
//   //
//   // fetch (endpoint) {
//   //   let headers =  {
//   //     'Accept': 'application/json',
//   //     'Content-Type': 'application/json',
//   //     'Authorization': `Bearer: ${this.props.jwt}`
//   //   }
//   //
//   //   return window.fetch(endpoint, {
//   //       method: 'GET',
//   //       headers: headers
//   //     })
//   //     .then(response => response.json())
//   //     .catch(error => console.log(error))
//   // }
//   //
//   // getPlaylists (offset) {
//   //   this.fetch('/api/v1/playlists?offset=' + offset)
//   //     .then(response => {
//   //       this.setState({
//   //         offset: response.offset,
//   //         limit: response.limit,
//   //         playlists: this.state.playlists.concat(response.playlists),
//   //         next: response.next,
//   //         total: response.total
//   //       })
//   //
//   //       if(this.state.playlists.length < this.state.total){
//   //         const newOffset = this.state.offset + this.state.limit
//   //         this.getPlaylists(newOffset)
//   //       }
//   //     })
//   // }
//
//   render() {
//     return (
//       <h1>Playlists</h1>
//      //  <ul className='playlists'>
//      //    {this.state.playlists.map(function (playlist, i) {
//      //      return (
//      //        <li key={playlist.id} className='playlist'>
//      //          <Link to={`/playlists/${playlist.id}`}>
//      //            <div
//      //              className='top'
//      //              style={{backgroundImage: `url(${playlist.cover_url})`}}
//      //            >
//      //            </div>
//      //          </Link>
//      //          <div className='bottom'>
//      //            <Link to={`/playlists/${playlist.id}`}>
//      //              <h1>{playlist.name}</h1>
//      //            </Link>
//      //            <h3>
//      //              {playlist.track_count} {pluralize('song', playlist.track_count)}
//      //            </h3>
//      //          </div>
//      //        </li>
//      //      )
//      //    })}
//      // </ul>
//     )
//   }
// }
//
// export default Playlists;
