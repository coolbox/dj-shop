# frozen_string_literal: true

class PlaylistsController < ApplicationController
  def show
    @playlist = @spotify_client.playlist(params[:id])

    spotify_tracks = @playlist["tracks"]["items"]
    Track.create_from_spotify(spotify_tracks)
    @tracks = Track.where(spotify_id: spotify_tracks.map { |t| t["track"]["id"] })

    respond_to do |format|
      format.html
    end
  end
end
