# frozen_string_literal: true

class SpotifyApi < Apis::Base
  API_URL = ENV["SPOTIFY_API_URL"]

  def initialize(user_uid = nil)
    @api_base_url = self.class::API_URL
    @user_uid = user_uid
    @current_user = current_user
    @headers = headers

    refresh_token
  end

  def refresh_token
    return unless @current_user.access_token_expired?

    body = {
      grant_type: :refresh_token,
      refresh_token: current_user.refresh_token
    }

    auth = {
      username: ENV["SPOTIFY_CLIENT_ID"],
      password: ENV["SPOTIFY_CLIENT_SECRET"]
    }

    response = with_http_retries do
      HTTParty.post(
        "https://accounts.spotify.com/api/token",
        body: body,
        basic_auth: auth
      )
    end

    @current_user.update(
      omniauth_token:
        parse_response_body(response, "refresh_token")["access_token"]
    )
  end

  def user_playlists
    endpoint = "/users/#{current_user.uid}/playlists"

    response = with_http_retries do
      HTTParty.get(
        api_endpoint_url(endpoint),
        headers: @headers
      )
    end
    return_or_raise_response(response, __method__)
  end

  def playlist(playlist_id)
    endpoint = "/playlists/#{playlist_id}"

    response = with_http_retries do
      HTTParty.get(
        api_endpoint_url(endpoint),
        headers: @headers
      )
    end
    return_or_raise_response(response, __method__)
  end

  def current_user
    @current_user ||= User.find_by(uid: @user_uid)
  end

  private

  def headers
    { "Authorization": "Bearer #{@current_user.omniauth_token}" }
  end
end
