class CreatePackagesPackageItems < ActiveRecord::Migration[6.1]
  def change
    create_table :packages_package_items do |t|
      t.references :package, foreign_key: true
      t.references :package_item, foreign_key: true

      t.timestamps
    end
  end
end
