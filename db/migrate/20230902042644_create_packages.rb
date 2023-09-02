class CreatePackages < ActiveRecord::Migration[6.1]
  def change
    create_table :packages do |t|
      t.float :height
      t.float :width
      t.float :length
      t.float :weight
      t.references :order, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
