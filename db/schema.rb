# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_09_02_061719) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "customers", force: :cascade do |t|
    t.string "name"
    t.jsonb "address"
    t.string "phone_number"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "items", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.integer "quantity"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "order_id"
    t.integer "assigned_quantity"
    t.integer "picked_quantity"
    t.index ["order_id"], name: "index_items_on_order_id"
    t.index ["product_id"], name: "index_items_on_product_id"
  end

  create_table "items_orders", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.bigint "item_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["item_id"], name: "index_items_orders_on_item_id"
    t.index ["order_id"], name: "index_items_orders_on_order_id"
  end

  create_table "items_products", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.bigint "product_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["item_id"], name: "index_items_products_on_item_id"
    t.index ["product_id"], name: "index_items_products_on_product_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "priority"
    t.bigint "user_id", null: false
    t.bigint "customer_id", null: false
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["customer_id"], name: "index_orders_on_customer_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "package_items", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.integer "quantity"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "package_id"
    t.index ["package_id"], name: "index_package_items_on_package_id"
    t.index ["product_id"], name: "index_package_items_on_product_id"
  end

  create_table "packages", force: :cascade do |t|
    t.float "height"
    t.float "width"
    t.float "length"
    t.float "weight"
    t.bigint "order_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["order_id"], name: "index_packages_on_order_id"
  end

  create_table "packages_package_items", force: :cascade do |t|
    t.bigint "package_id"
    t.bigint "package_item_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["package_id"], name: "index_packages_package_items_on_package_id"
    t.index ["package_item_id"], name: "index_packages_package_items_on_package_item_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "code"
    t.string "name"
    t.string "category"
    t.float "price"
    t.float "length"
    t.float "width"
    t.float "height"
    t.float "weight"
    t.integer "current_stock"
    t.integer "assigned_stock"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "products_package_items", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "package_item_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["package_item_id"], name: "index_products_package_items_on_package_item_id"
    t.index ["product_id"], name: "index_products_package_items_on_product_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.integer "role"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "items", "orders"
  add_foreign_key "items", "products"
  add_foreign_key "items_orders", "items"
  add_foreign_key "items_orders", "orders"
  add_foreign_key "items_products", "items"
  add_foreign_key "items_products", "products"
  add_foreign_key "orders", "customers"
  add_foreign_key "orders", "users"
  add_foreign_key "package_items", "packages"
  add_foreign_key "package_items", "products"
  add_foreign_key "packages", "orders"
  add_foreign_key "packages_package_items", "package_items"
  add_foreign_key "packages_package_items", "packages"
  add_foreign_key "products_package_items", "package_items"
  add_foreign_key "products_package_items", "products"
end
