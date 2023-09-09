class PackagesController < ApplicationController
  wrap_parameters format: []
  skip_before_action :authorize, only: [:index, :show, :create]

  def index
    packages = Package.all
    render json: packages
  end

  def show
    @package = Package.find_by_id(params[:id])
    render json: @package
  end

  def create
    order = Order.find_by_id(params[:order_id])
    @package = Package.create!(package_params)
    order.packages << @package
    order.update(status: 1)
    render json: @package
  end

  def update
    @package = Package.find_by_id(params[:id])
    @package.update(package_params)
    render json: @package
  end

  def destroy
    @order = Order.find_by_id(params[:order_id])
    @package = Package.find_by_id(params[:id])
    # Update the picked quantity of the item
    order_items = @order.items
    package_items = @package.package_items
    package_items.each do |package_item|
        order_item = order_items.find_by(product_id: package_item.product_id)
        order_item.update(picked_quantity: order_item.picked_quantity - package_item.quantity)
    end
    # Delete the package
    @package.destroy
    render json: @order
  end

  private

  def package_params
    params.permit(:order_id, :height, :width, :length, :weight, :package_items)
  end

end
