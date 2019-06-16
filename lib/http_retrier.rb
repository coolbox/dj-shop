# frozen_string_literal: true

module DjShop
  module HttpRetrier
    def with_http_retries
      retries = [5, 10, 20, 40, 80, 160, 320, 640]
      begin
        yield
      rescue *http_exceptions_to_retry => e
        caller = caller_locations[1].to_s.sub(Rails.root.to_s, "")
        Rails.logger.warn(
          "error=http_retry " \
          "exception=#{e} " \
          "caller=#{caller}"
        )

        delay = retries.shift
        if delay
          sleep delay
          retry
        else
          Rails.logger.error(
            "error=http_retry_failed " \
            "exception=#{e} " \
            "caller=#{caller}"
          )
          raise e
        end
      end
    end

    private

    def http_exceptions_to_retry
      [
        HTTParty::Error, SocketError, Net::ReadTimeout, Net::OpenTimeout,
        Errno::ECONNREFUSED, Errno::ENETUNREACH, Errno::ETIMEDOUT,
        Errno::ECONNRESET, OpenSSL::SSL::SSLError,
        Faraday::TimeoutError, Faraday::ClientError
      ]
    end
  end
end
