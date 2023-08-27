class ItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :product
  belongs_to :product
  belongs_to :order
end
