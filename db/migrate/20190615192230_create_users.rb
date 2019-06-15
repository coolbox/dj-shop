class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :provider
      t.string :uid
      t.string :omniauth_token
      t.string :refresh_token
      t.integer :expires_at
      t.boolean :expires
      t.string :name
      t.string :nickname
      t.string :email
      t.string :image
      t.integer :follower_count

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.inet     :current_sign_in_ip
      t.inet     :last_sign_in_ip

      t.timestamps
    end

    add_index :users, :email,                unique: true
    add_index :users, :omniauth_token,       unique: true
  end
end
