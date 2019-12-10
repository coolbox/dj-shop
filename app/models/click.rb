class Click < ApplicationRecord
  store_accessor :data

  def data_sample(fields = [:name, :album_image, :artist_names])
    data.select do |key, _value|
      fields.include?(key.to_sym)
    end
  end
end
