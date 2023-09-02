class CreateProductsPackageItems < ActiveRecord::Migration[6.1]
  def change
    create_table :products_package_items do |t|
      t.references :product, null: false, foreign_key: true
      t.references :package_item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
