# frozen_string_literal: true

class LoginController < ApplicationController
  def new
    session[:user_return_to] = "http://localhost:3000/"
    redirect_to user_spotify_omniauth_authorize_url
  end
end
