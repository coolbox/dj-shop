require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module DjShop
  class Application < Rails::Application
    config.api_only = true

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Load application services
    # config.autoload_paths << "#{Rails.root}/lib"
    config.autoload_paths += %W(
      #{config.root}/lib
      #{config.root}/app
    )
    config.eager_load_paths << "#{config.root}/lib"
    config.eager_load_paths << "#{config.root}/app"

    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
  end
end
