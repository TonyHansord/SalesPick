class Package < ApplicationRecord
    belongs_to :order
    has_many :package_items, dependent: :destroy
end
