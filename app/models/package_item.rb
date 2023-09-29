class PackageItem < ApplicationRecord
    belongs_to :product
    belongs_to :package

    def product_name
        product.name
    end
end
