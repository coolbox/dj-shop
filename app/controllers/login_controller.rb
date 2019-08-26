# frozen_string_literal: true

class LoginController < ApplicationController
  skip_before_action :authenticate, only: [:new]

  def new
    session[:user_return_to] = "/playlists"
    redirect_to user_spotify_omniauth_authorize_url
  end
end
