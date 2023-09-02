class OrderSerializer < ActiveModel::Serializer
  attributes :id, :priority, :status, :order_total, :created_at, :first_product, :user_id, :customer, :items, :packages
  has_one :customer
  has_many :packages
  has_many :items
  has_one :user
end
