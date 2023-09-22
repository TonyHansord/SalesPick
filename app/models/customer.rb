class Customer < ApplicationRecord
  has_many :orders
  has_many :items, through: :orders
  has_many :products, through: :items
  validates :name, presence: true
  accepts_nested_attributes_for :orders

  default_scope { order(id: :asc) }
end
