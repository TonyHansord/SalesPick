class Product < ApplicationRecord
  has_one_attached :product_image
  has_many :customers, through: :orders
  has_many :orders, through: :items
  has_and_belongs_to_many :package_items
  has_many :packages, through: :package_items
  has_many :items
end
