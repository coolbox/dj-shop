# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :authenticate
  before_action :set_auth

  def spotify
    @user = User.from_omniauth(@auth)
    @user.update_spotify_auth(@auth)

    jwt = Auth.encode_uid(@user.uid)
    # sign_in_and_redirect(@user, event: :authentication)
    sign_in(@user)
    redirect_to(ENV["CLIENT_URL"] + "playlists?token=#{jwt}")
  end

  def failure
    redirect_to root_path
  end

  private

  def set_auth
    @auth = request.env["omniauth.auth"]
  end
end
