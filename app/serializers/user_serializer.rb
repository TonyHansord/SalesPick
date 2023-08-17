class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :full_name, :username, :role
end
