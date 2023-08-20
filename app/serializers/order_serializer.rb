class OrderSerializer < ActiveModel::Serializer
  attributes :id, :priority, :status, :order_total, :products, :user, :customer
  has_one :user
  has_one :customer
  has_many :products
end
