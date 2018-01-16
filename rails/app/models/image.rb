class Image < ApplicationRecord
  mount_uploader :content, ImageUploader

  belongs_to :product
end
