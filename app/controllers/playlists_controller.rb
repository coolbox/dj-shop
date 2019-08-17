# frozen_string_literal: true

class PlaylistsController < ApplicationController
  def index
    @playlists = current_user ? @spotify_client.user_playlists["items"] : []
    @playlists = @playlists.map do |p|
      playlist_attributes(p)
    end

    render json: @playlists
  end

  def show
    @playlist = @spotify_client.playlist(params[:id])

    spotify_tracks = @playlist["tracks"]["items"]
    Track.create_from_spotify(spotify_tracks)
    @tracks = Track.where(
      spotify_id: spotify_tracks.map { |t| t["track"]["id"] }
    )

    @playlist = playlist_attributes(@playlist).merge(tracks: @tracks)

    render json: @playlist
  end

  private

  def playlist_attributes(spotify_playlist_object)
    p = spotify_playlist_object
    {
      id: p["id"],
      spotify_url: p["uri"],
      cover_url: p["images"][0]["url"],
      name: p["name"],
      track_count: p["tracks"]["total"]
    }
  end
end
