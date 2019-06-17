# frozen_string_literal: true

class PlaylistsController < ApplicationController
  def show
    @playlist = @spotify_client.playlist(params[:id])

    respond_to do |format|
      format.html
    end
  end
end
