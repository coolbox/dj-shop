# frozen_string_literal: true

require "httparty"

class Apis::AmazonAp
  include HttpRetrier

  API_URL = "http://webservices.amazon.com/onca/xml"

  def search(artist, track)
    query = {
      "term": "#{artist} #{track}",
      "media": "music",
      "limit": 5
    }

    response = with_http_retries do
      HTTParty.get(API_URL, query: query)
    end
    return_or_raise_response(response, __method__)
  end
end
