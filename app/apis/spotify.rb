# frozen_string_literal: true

require "httparty"

module Apis::Spotify
  class Client
    include DjShop::HttpRetrier
    class HttpError < StandardError; end

    SPOTIFY_API_URL = ENV["SPOTIFY_API_URL"]
    attr_reader :user_uid

    def initialize(user_uid = nil)
      @user_uid = user_uid
      @current_user = current_user
      @headers = headers
    end

    def user_playlists
      endpoint = "/users/#{@user_uid}/playlists"

      response = with_http_retries do
        HTTParty.post(
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
          Apis::Spotify::Client::HttpError,
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
end
