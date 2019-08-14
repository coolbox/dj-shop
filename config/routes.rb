# frozen_string_literal: true
require "sidekiq/web"

Rails.application.routes.draw do
  root to: "playlists#index"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users,
             only: :omniauth_callbacks,
             controllers: {
               omniauth_callbacks: "users/omniauth_callbacks"
             }

  devise_scope :user do
    get "login", to: "devise/sessions#new", as: :new_user_session
    get "logout", to: "devise/sessions#destroy", as: :destroy_user_session
  end

  scope "/api" do
    scope "/v1" do
      resources :login, only: [:new], defaults: { format: :json }
      resources :playlists, only: [:index, :show], defaults: { format: :json }
    end
  end

  mount Sidekiq::Web => "/sidekiq"
end
