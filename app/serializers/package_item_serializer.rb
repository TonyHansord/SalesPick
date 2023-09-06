class PackageItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :product_name
  has_one :product
end
