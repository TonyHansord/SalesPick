class ChangeProductsPackageItemsToPackageItemsProducts < ActiveRecord::Migration[6.1]
  def change
    rename_table :products_package_items, :package_items_products
  end
end
