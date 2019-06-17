# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "base#index"

  devise_for :users,
             only: :omniauth_callbacks,
             controllers: {
               omniauth_callbacks: "users/omniauth_callbacks"
             }

  devise_scope :user do
    get "login", to: "devise/sessions#new", as: :new_user_session
    get "logout", to: "devise/sessions#destroy", as: :destroy_user_session
  end

  resources :playlists, only: [:show]
end
