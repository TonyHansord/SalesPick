class Item < ApplicationRecord
  belongs_to :product
  belongs_to :order
  validates :quantity, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :assigned_quantity, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :picked_quantity, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :product_id, presence: true
  validates :order_id, presence: true
  validates :product_id, uniqueness: { scope: :order_id, message: "already exists in this order" }
end
