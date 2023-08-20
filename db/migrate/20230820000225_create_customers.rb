class CreateCustomers < ActiveRecord::Migration[6.1]
  def change
    create_table :customers do |t|
      t.string :name
      t.jsonb :address
      t.string :phone_number
      t.string :email

      t.timestamps
    end
  end
end
