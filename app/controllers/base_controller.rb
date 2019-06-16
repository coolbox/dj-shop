# frozen_string_literal: true

class BaseController < ApplicationController
  def index
    @body_id = "homepage"

    # if current_user
    #   @spotify_client = Apis::Spotify::Client.new(current_user.uid)
    #   @playlists = @spotify_client.user_playlists
    # end

    respond_to do |format|
      format.html
    end
  end
end
