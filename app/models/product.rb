class Product < ApplicationRecord
  has_one_attached :product_image
  has_many :customers, through: :orders
  has_and_belongs_to_many :orders
end
