class AddOrderIDtoItems < ActiveRecord::Migration[6.1]
  def change
    add_reference :items, :order, foreign_key: true
  end
end
