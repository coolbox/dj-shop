# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :spotify_client

  def new_session_path
    new_user_session_path
  end

  private

  def spotify_client
    return unless current_user

    @spotify_client ||= Apis::Spotify.new(current_user.uid)
  end
end
