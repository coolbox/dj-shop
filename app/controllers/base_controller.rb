# frozen_string_literal: true

class BaseController < ApplicationController
  def index
    @playlists = @spotify_client.user_playlists["items"] if current_user

    respond_to do |format|
      format.html
    end
  end
end
