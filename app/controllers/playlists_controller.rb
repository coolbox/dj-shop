# frozen_string_literal: true

class PlaylistsController < ApplicationController
  def index
    @playlists = current_user ? @spotify_client.user_playlists["items"] : []

    render json: {
      playlists: @playlists.map do |p|
        {
          id: p["id"],
          cover_url: p["images"][0]["url"],
          name: p["name"]
        }
      end
    }
  end

  def show
    @playlist = @spotify_client.playlist(params[:id])

    spotify_tracks = @playlist["tracks"]["items"]
    Track.create_from_spotify(spotify_tracks)
    @tracks = Track.where(
      spotify_id: spotify_tracks.map { |t| t["track"]["id"] }
    )

    respond_to do |format|
      format.json do
        render json: {
          playlist: {
            name: @playlist["name"],
            cover_url: @playlist["images"][0]["url"],
            description: @playlist["description"]
          },
          tracks: @tracks
        }
      end
    end
  end
end
