class ProductSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :code, :name, :category, :price, :length, :width, :height, :weight, :current_stock, :assigned_stock, :product_image

  def product_image
    if object.product_image.attached?
      {
        url: rails_blob_url(object.product_image),
      }
    end
  end
end
