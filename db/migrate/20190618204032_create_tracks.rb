class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.string :spotify_id, null: false
      t.index :spotify_id, unique: true

      t.string :artist_name
      t.string :track_name
      t.string :itunes_url
      t.string :spotify_url
      t.string :spotify_image_url
      t.integer :duration_ms
      t.string :release_date
      t.string :release_date_precision
      t.timestamps
    end
  end
end
