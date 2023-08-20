class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone_number, :email, :orders
  has_many :orders
end
