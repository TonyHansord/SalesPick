class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.string :priority
      t.references :user, null: false, foreign_key: true
      t.references :customer, null: false, foreign_key: true
      t.string :status
      t.float :total

      t.timestamps
    end
  end
end
