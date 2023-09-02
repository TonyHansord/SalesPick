class AddPackageIdToPackageItems < ActiveRecord::Migration[6.1]
  def change
    add_reference :package_items, :package, foreign_key: true
  end
end
