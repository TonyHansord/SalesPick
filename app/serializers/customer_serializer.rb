class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone_number, :email
end
