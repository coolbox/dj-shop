# frozen_string_literal: true

class Itunes < Apis::Base
  API_URL = "https://itunes.apple.com"

  def search(artist, track)
    endpoint = "/search"
    query = {
      "term": "#{artist} #{track}",
      "media": "music",
      "limit": 5
    }

    response = with_http_retries do
      HTTParty.get(api_endpoint_url(endpoint), query: query)
    end

    response = return_or_raise_response(response, __method__)
    return nil if response.blank?

    results = response["results"]
    return nil if results.empty?

    results
  end
end
