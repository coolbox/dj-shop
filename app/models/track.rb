# frozen_string_literal: true

class Track < ApplicationRecord
  def self.create_from_spotify(spotify_tracks)
    spotify_tracks.each do |track|
      TrackWorker.perform_async(track)
    end
  end
end
