# frozen_string_literal: true

class LoginController < ApplicationController
  def new
    session[:user_return_to] = playlists_url
    redirect_to user_spotify_omniauth_authorize_url
  end
end
