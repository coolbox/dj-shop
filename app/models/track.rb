# frozen_string_literal: true

class Track < ApplicationRecord
  def self.create_from_spotify(spotify_tracks)
    spotify_track_ids = spotify_tracks.map { |t| t["track"]["id"] }
    track_ids = where(id: spotify_track_ids).pluck(:spotify_id)
    ids_to_create = spotify_track_ids - track_ids

    tracks = spotify_tracks.reject do |t|
      ids_to_create.include?(t["track"]["id"])
    end

    tracks.each do |track|
      TrackWorker.perform_async(track)
    end
  end
end
