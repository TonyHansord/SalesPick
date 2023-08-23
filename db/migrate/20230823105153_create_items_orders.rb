class CreateItemsOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :items_orders do |t|
      t.references :order, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true
      t.timestamps
    end

    drop_table :orders_products
  end
end
