class Order < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :customer
  has_many :items
  has_many :products, through: :items
  has_many :packages, dependent: :destroy
  has_many :package_items, through: :packages
  has_many_attached :order_images

  enum status: [:pending, :in_progress, :complete]
  enum priority: [:unassigned, :low, :medium, :high]

  default_scope { order({ priority: :desc }, :created_at) }

  def first_product
    items.first
  end

  def order_total
    items.map { |item| item.product.price * item.quantity }.sum.round(2)
  end
end
