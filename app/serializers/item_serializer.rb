class ItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :product, :assigned_quantity, :picked_quantity
  belongs_to :product
  belongs_to :order
end
