class OrderSerializer < ActiveModel::Serializer
  attributes :id, :priority, :status, :order_total, :created_at, :products, :first_product, :user, :customer
  has_one :user
  has_one :customer
  has_many :products
end
