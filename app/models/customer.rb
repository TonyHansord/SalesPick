class Customer < ApplicationRecord
    has_many :orders
    has_many :products, through: :orders
end
