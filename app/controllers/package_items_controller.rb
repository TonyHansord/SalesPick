class PackageItemsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :create]
  wrap_parameters format: []
  before_action :check_package, only: [:create]

  def index
    @package_items = PackageItem.all
    render json: @package_items
  end

  def show
    @package_item = PackageItem.find_by_id(params[:id])
    render json: @package_item
  end

  def create
    item = Item.find_by_id(params[:item_id])

    package = Package.find_by_id(params[:package_id])

    # If the package already has the product, update the quantity
    if package.package_items.find_by(product_id: params[:product_id])
      if item.picked_quantity < item.assigned_quantity
        package_item = package.package_items.find_by(product_id: params[:product_id])
        package_item.update(quantity: @package_item.quantity + params[:quantity])
        # Update the picked quantity of the item
        item.update(picked_quantity: item.picked_quantity + params[:quantity])
        render json: @package_item, status: :created
        return
      else
        render json: { error: "Can not overpick" }, status: :unprocessable_entity
      end
    else
      # If the package does not have the product, create a new package item
      @package_item = PackageItem.create!(package_item_params)
      package.package_items << @package_item
      render json: @package_item, status: :created
    end
  end

  def update
    @package_item = PackageItem.find_by_id(params[:id])
    @package_item.update(package_item_params)
    render json: @package_item
  end

  private

  def package_item_params
    params.permit(:package_id, :product_id, :quantity)
  end

  def check_package
    package = Package.find_by_id(params[:package_id])
    unless package
      render json: { error: "Please create package first" }, status: :not_found
    end
  end
end
