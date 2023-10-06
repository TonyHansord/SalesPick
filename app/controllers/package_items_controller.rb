class PackageItemsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :create, :destroy]
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
    @package_item = package.package_items.find_by(product_id: params[:product_id])

    # If the package already has the product, update the quantity
    if @package_item
      if item.picked_quantity < item.assigned_quantity
        @package_item.update(quantity: @package_item.quantity + params[:quantity])
        # Update the picked quantity of the item
        update_picked_quantity
        update_dimensions
        render json: { message: 'Item added' }, status: :created
        return
      else
        render json: { error: "Can not overpick" }, status: :unprocessable_entity
      end
    else
      # If the package does not have the product, create a new package item
      @package_item = PackageItem.create!(:package_id => params[:package_id], :product_id => params[:product_id], :quantity => params[:quantity])
      package.package_items << @package_item
      # Update the picked quantity of the item
      update_picked_quantity
      update_dimensions
      render json: { message: 'Item added' }, status: :created
    end
  end

  def update
    @package_item = PackageItem.find_by_id(params[:id])
    @package_item.update(package_item_params)
    render json: @package_item
  end

  def destroy
    @package_item = PackageItem.find_by_id(params[:id])

    # Update the picked quantity of the item
    item = Item.find_by_id(params[:item_id])
    if @package_item.quantity > 1
      @package_item.update(quantity: @package_item.quantity - 1)
      item.update(picked_quantity: item.picked_quantity - 1)
      render json: @package_item
    else
      @package_item.destroy
      item.update(picked_quantity: item.picked_quantity - 1)
      render json: { message: "Successfully deleted" }
    end
  end

  private

  def package_item_params
    params.permit(:package_id, :product_id, :quantity, :item_id)
  end

  def check_package
    package = Package.find_by_id(params[:package_id])
    unless package
      render json: { error: "Please create package first" }, status: :not_found
    end
  end

  def update_picked_quantity
    item = Item.find_by_id(params[:item_id])
    item.update(picked_quantity: item.picked_quantity + params[:quantity])
  end

  def update_dimensions
    package = Package.find_by_id(params[:package_id])
    package_volume = package.length * package.width * package.height
    product = Product.find_by_id(params[:product_id])
    product_volume = product.length * product.width * product.height

    if package_volume < product_volume
      package.update(length: product.length, width: product.width, height: product.height, weight: package.weight + product.weight)
    else
      package.update(weight: package.weight + product.weight)
    end
  end
end
