class PackageSerializer < ActiveModel::Serializer
  attributes :id, :height, :width, :length, :weight, :package_items
  has_many :package_items
end
