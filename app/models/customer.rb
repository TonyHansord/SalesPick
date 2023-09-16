class Customer < ApplicationRecord
  has_many :orders
  has_many :items, through: :orders
  has_many :products, through: :items
  validates :name, presence: true
end
