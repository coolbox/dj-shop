# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate
  before_action :spotify_client

  def logged_in?
    !current_user.nil?
  end

  def current_user
    return @current_user if @current_user
    return unless auth_present?

    uid = Auth.decode_uid(read_token_from_request)
    @current_user = User.find_by(uid: uid)
    return @current_user if @current_user
  end

  def authenticate
    return if logged_in?

    render json: { error: "unauthorized" }, status: :unauthorized
  end

  private

  def read_token_from_request
    request.env["HTTP_AUTHORIZATION"].scan(/Bearer: (.*)$/).flatten.last
  end

  def auth_present?
    !request
      .env
      .fetch("HTTP_AUTHORIZATION", "")
      .scan(/Bearer/)
      .flatten
      .first
      .nil?
  end

  def spotify_client
    return unless current_user

    @spotify_client ||= SpotifyApi.new(current_user.uid)
  end
end
