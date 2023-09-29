class OrderSerializer < ActiveModel::Serializer
  attributes :id, :priority, :status, :order_total, :created_at, :first_product, :user_id, :customer, :items, :packages, :order_images, :customer_name
  has_one :customer
  has_many :packages
  has_many :package_items, through: :packages
  has_many :items
  has_one :user

  def order_images
    object.order_images.map do |image|
      Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true)
    end
  end
end
