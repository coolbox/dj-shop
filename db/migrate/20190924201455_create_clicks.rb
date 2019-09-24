class CreateClicks < ActiveRecord::Migration[5.2]
  def change
    enable_extension "hstore"

    create_table :clicks do |t|
      t.hstore :data
      t.string :user_uid
      t.string :trackProvider

      t.timestamps
    end

    add_index :clicks, :data, using: :gist
  end
end
