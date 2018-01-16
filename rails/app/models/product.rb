class Product < ApplicationRecord
  has_many :images

  validates :name, presence: true
end
