# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  before_action :set_auth

  def spotify
    @user = User.from_omniauth(@auth)
    sign_in_and_redirect @user, event: :authentication
  end

  def failure
    redirect_to root_path
  end

  private

  def set_auth
    @auth = request.env["omniauth.auth"]
  end
end
