class PackageSerializer < ActiveModel::Serializer
  attributes :id, :height, :width, :length, :package_items
end
