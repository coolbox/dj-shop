# frozen_string_literal: true

class PlaylistsController < ApplicationController
  def show
    @playlist = @spotify_client.playlist(params[:id])
    @tracks = Track.save_and_find_by_spotify_tracks(
      @playlist["tracks"]["items"]
    )

    respond_to do |format|
      format.html
    end
  end
end
