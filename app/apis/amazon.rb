# frozen_string_literal: true

class Amazon < Apis::Base
  API_URL = "http://webservices.amazon.com"

  def initialize
    super
    @default_params = {
      "Service" => "AWSECommerceService",
      "Operation" => "ItemSearch",
      "SearchIndex" => "MP3Downloads",
      "AssociateTag" => ENV["AMAZON_AP_ASSOCIATE_ID"],
      "AWSAccessKeyId" => ENV["AMAZON_AP_API_ACCESS_KEY"],
      "ResponseGroup" => "Images,ItemAttributes,Offers"
    }
  end

  def search(artist, track)
    endpoint = "/onca/xml"
    params = {}
    params["Artist"] = artist
    params["Title"] = track
    params["Timestamp"] = Time.zone.now.iso8601
    signature = generate_signature(params)

    request_url = "https://webservices.amazon.com/onca/xml?#{hash_to_url_params_string(merged_params(params))}&Signature=#{URI.escape(signature, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))}"
    puts "@@@@@ request_url: #{request_url}"

    response = with_http_retries do
      # HTTParty.get(api_endpoint_url(endpoint), query: merged_params(params))
      HTTParty.get(request_url)
    end
    puts "@@@ Request: #{response.request.last_uri.to_s}"
    return_or_raise_response(response, __method__)
  end

  private

  def merged_params(params)
    default_params.merge(params).sort.to_h
  end

  def generate_signature(params)
    Base64.encode64(
      OpenSSL::HMAC.digest(
        OpenSSL::Digest.new("sha256"),
        ENV["AMAZON_AP_API_SECRET_KEY"],
        "GET\n#{'webservices.amazon.com'}\n#{'/onca/xml'}\n#{hash_to_url_params_string(merged_params(params))}"
      )
    ).strip
  end
end
