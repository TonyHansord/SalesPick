class AddAssignedQuantityColumnToItems < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :assigned_quantity, :integer
    add_column :items, :picked_quantity, :integer
  end
end
