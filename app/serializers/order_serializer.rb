class OrderSerializer < ActiveModel::Serializer
  attributes :id, :priority, :status, :order_total, :created_at, :first_product, :user_id, :customer, :items
  has_one :customer
  has_many :items, serializer: ItemSerializer
  has_one :user
end
