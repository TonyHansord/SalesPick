class Order < ApplicationRecord
  belongs_to :user
  belongs_to :customer
  has_many :items
  has_many :products, through: :items

  enum status: [:pending, :in_progress, :complete]
  enum priority: [:low, :medium, :high]

  def first_product
    items.first
  end

  def order_total
    items.map { |item| item.product.price * item.quantity }.sum.round(2)
  end
end
