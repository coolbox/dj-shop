# frozen_string_literal: true

require "httparty"

class Apis::Base
  include HttpRetrier
  class HttpError < StandardError; end

  attr_reader :api_base_url, :default_params

  def initialize
    @api_base_url = self.class::API_URL
  end

  private

  def api_endpoint_url(endpoint)
    api_base_url + endpoint
  end

  def hash_to_url_params_string(params)
    URI.encode_www_form(params.map { |key, value| [key, value] })
  end

  def return_or_raise_response(response, current_method)
    if successful_response?(response.code)
      parse_response_body(response, current_method)
    else
      Rails.logger.error(
        "Apis::Base::HttpError "\
        "#{self.class}.#{current_method}: #{response.code} #{response.body}"
      )
      nil
    end
  end

  def parse_response_body(response, current_method)
    JSON.parse(response.body)
  rescue JSON::ParserError => e
    raise "DjShop::#{self.class}.#{current_method} - JSON::ParserError: " \
          "#{response.code} #{response.body} #{e}"
  end

  def successful_response?(response_code)
    (200..299).cover?(response_code)
  end
end
