class CreatePackageItems < ActiveRecord::Migration[6.1]
  def change
    create_table :package_items do |t|
      t.references :product, null: false, foreign_key: true
      t.integer :quantity

      t.timestamps
    end
  end
end
