# frozen_string_literal: true

require "httparty"

class Apis::Spotify
  include HttpRetrier

  SPOTIFY_API_URL = ENV["SPOTIFY_API_URL"]

  class HttpError < StandardError; end

  def initialize(user_uid = nil)
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
      omniauth_token: parse_response_body(response)["access_token"]
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
    return_or_raise_response(response)
  end

  def playlist(playlist_id)
    endpoint = "/playlists/#{playlist_id}"

    response = with_http_retries do
      HTTParty.get(
        api_endpoint_url(endpoint),
        headers: @headers
      )
    end
    return_or_raise_response(response)
  end

  def current_user
    @current_user ||= User.find_by(uid: @user_uid)
  end

  def api_endpoint_url(endpoint)
    SPOTIFY_API_URL + endpoint
  end

  private

  def return_or_raise_response(response)
    if successful_response?(response.code)
      parse_response_body(response)
    else
      raise(
        Apis::Spotify::HttpError,
        "SpotifyClient.new.playlists: #{response.code} #{response.body}"
      )
    end
  end

  def headers
    { "Authorization": "Bearer #{@current_user.omniauth_token}" }
  end

  def parse_response_body(response)
    JSON.parse(response.body)
  rescue JSON::ParserError => e
    raise "DjShop::SpotifyClient.new.playlists - JSON::ParserError: " \
          "#{response.code} #{response.body} #{e}"
  end

  def successful_response?(response_code)
    (200..299).cover?(response_code)
  end
end
