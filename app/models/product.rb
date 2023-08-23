class Product < ApplicationRecord
  has_one_attached :product_image
  has_many :customers, through: :orders
  has_many :orders, through: :items
  has_many :items
end
