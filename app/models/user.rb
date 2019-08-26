# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :omniauthable,
         :rememberable,
         :trackable,
         omniauth_providers: [:spotify]

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid.to_s).first_or_create
  end

  def update_spotify_auth(auth)
    update(
      omniauth_token: auth.credentials.token,
      refresh_token: auth.credentials.refresh_token,
      expires_at: auth.credentials.expires_at,
      expires: auth.credentials.expires,
      name: auth.info.name,
      nickname: auth.info.nickname,
      email: auth.info.email,
      image: auth.info.image,
      follower_count: auth.info.follower_count
    )
  end

  def access_token_expired?
    (Time.zone.now - updated_at) > 3300
  end
end
