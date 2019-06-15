# frozen_string_literal: true

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify,
           ENV["SPOTIFY_CLIENT_ID"],
           ENV["SPOTIFY_CLIENT_SECRET"],
           scope: %w[
             user-read-email
             user-read-private
             playlist-read-private
             playlist-read-collaborative
           ].join(" ")
end
