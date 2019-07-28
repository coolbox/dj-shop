# frozen_string_literal: true

class Track < ApplicationRecord
  def self.save_and_find_by_spotify_tracks(spotify_tracks)
    tracks = []
    spotify_tracks.each do |track|
      track = track["track"]
      artist_name = track["artists"].map { |a| a["name"] }.join(", ")
      track_name = track["name"]
      itunes_url = search_itunes(artist_name, track_name)

      tracks << Track.new(
        spotify_id: track["id"],
        artist_name: artist_name,
        track_name: track_name,
        itunes_url: itunes_url,
        spotify_url: track["external_urls"]["spotify"],
        spotify_image_url: track["album"]["images"][0]["url"],
        duration_ms: track["duration_ms"],
        release_date: track["album"]["release_date"],
        release_date_precision:
          track["album"]["release_date_precision"]
      )
    end

    import(
      tracks,
      on_duplicate_key_update: {
        conflict_target: [:spotify_id],
        columns: [
          :artist_name,
          :track_name,
          :itunes_url,
          :spotify_url,
          :spotify_image_url,
          :duration_ms,
          :release_date,
          :release_date_precision
        ]
      }
    )
    tracks
  end

  def self.search_itunes(artist_name, track_name)
    response = Itunes.new.search(artist_name, track_name)
    results = response["results"]
    return if results.empty?

    results.first["collectionViewUrl"]
  end
end
