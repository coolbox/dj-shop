# frozen_string_literal: true

class PlaylistsController < ApplicationController
  def index
    Rails.logger.debug("@@@@@@ #{index_params}")
    spotify_playlists = @spotify_client.user_playlists(
      index_params[:offset] || 0
    )
    @playlists = current_user ? spotify_playlists["items"] : []
    Rails.logger.debug("@@@@@@ #{spotify_playlists.inspect}, Offset: #{index_params[:offset]}")
    @playlists = @playlists.map do |p|
      playlist_attributes(p)
    end

    render json: {
      playlists: @playlists,
      next: spotify_playlists["next"],
      limit: spotify_playlists["limit"],
      offset: spotify_playlists["offset"],
      total: spotify_playlists["total"]
    }
  end

  def show
    @playlist = @spotify_client.playlist(params[:id])

    spotify_tracks = @playlist["tracks"]["items"]
    Track.create_from_spotify(spotify_tracks)
    @track_urls = Track.where(
      spotify_id: spotify_tracks.map { |t| t["track"]["id"] }
    )
    # @playlist = playlist_attributes(@playlist).merge(tracks: @tracks)

    render json: {
      playlist: @playlist,
      track_urls: @track_urls
    }
  end

  private

  def index_params
    params.permit(:limit, :offset)
  end

  def playlist_attributes(spotify_playlist_object)
    p = spotify_playlist_object
    {
      id: p["id"],
      spotify_url: p["uri"],
      cover_url: p["images"].empty? ? nil : p["images"][0]["url"],
      name: p["name"],
      track_count: p["tracks"]["total"],
      tracks: p["tracks"]["items"]
    }
  end
end
