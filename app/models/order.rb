class Order < ApplicationRecord
  belongs_to :user
  belongs_to :customer
  has_and_belongs_to_many :items
  has_many :products, through: :items

  enum status: [:pending, :in_progress, :complete]
  enum priority: [:low, :medium, :high]

  def first_product
    items.first
  end

  def order_total
    products.sum(:price)
  end
end
