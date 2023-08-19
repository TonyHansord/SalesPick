class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :code
      t.string :name
      t.string :category
      t.float :price
      t.float :length
      t.float :width
      t.float :height
      t.float :weight
      t.integer :current_stock
      t.integer :assigned_stock
      t.string :image

      t.timestamps
    end
  end
end
