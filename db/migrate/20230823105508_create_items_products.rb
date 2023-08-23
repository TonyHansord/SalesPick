class CreateItemsProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :items_products do |t|
      t.references :item, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true

      t.timestamps
    end
  end
end
