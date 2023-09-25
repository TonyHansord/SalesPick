class Product < ApplicationRecord
  has_one_attached :product_image
  has_many :customers, through: :orders
  has_many :orders, through: :items
  has_and_belongs_to_many :package_items, dependent: :destroy
  has_many :packages, through: :package_items
  has_many :items, dependent: :destroy
  validates :name, presence: true
  validates :price, presence: true
  validates :current_stock, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :assigned_stock, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
