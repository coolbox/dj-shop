class ClickWorker
  include Sidekiq::Worker
  sidekiq_options queue: :track_generator, retry: 5

  sidekiq_retry_in do |count|
    secs = [2, 5, 10, 20, 40].map(&:minutes)
    count >= secs.size - 1 ? secs[count] : 40.minutes
  end

  sidekiq_retries_exhausted do |msg|
    Sidekiq.logger.warn(
      "warning=#{msg['class']} failed. "\
      "arguments=#{msg['args']} "\
      "error=#{msg['error_message']}"
    )
  end

  def perform(spotify_track)
    track = spotify_track["track"]

    Rails.logger.info(
      "info=TrackWorker:start "\
      "order_id=#{track['id']} "\
      "time=#{Time.zone.now.strftime('%Y-%m-%d %H:%M:%S.%L')}"
    )

    begin
      artist_name = track["artists"].map { |a| a["name"] }.join(", ")
      track_name = track["name"]

      # Search iTunes
      itunes_response = Itunes.new.search(artist_name, track_name)
      itunes_url =
        itunes_response.nil? ? nil : itunes_response.first["collectionViewUrl"]

      Track.create(
        spotify_id: track["id"],
        artist_name: artist_name,
        track_name: track_name,
        itunes_url: itunes_url,
        spotify_url: track["external_urls"]["spotify"],
        spotify_image_url: track["album"]["images"][0]["url"],
        duration_ms: track["duration_ms"],
        release_date: track["album"]["release_date"],
        release_date_precision: track["album"]["release_date_precision"]
      )
    rescue => e
      Rails.logger.error(
        "info=TrackWorker "\
        "exception=#{e}"\
        "spotify_id=#{track['id']} "\
        "time=#{Time.zone.now.strftime('%Y-%m-%d %H:%M:%S.%L')}"
      )
    end

    Rails.logger.info(
      "info=TrackWorker:end "\
      "spotify_id=#{track['id']} "\
      "time=#{Time.zone.now.strftime('%Y-%m-%d %H:%M:%S.%L')}"
    )
  end
end
