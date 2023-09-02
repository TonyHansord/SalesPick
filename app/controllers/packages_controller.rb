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
    render json: @package
  end

  def update
    @package = Package.find_by_id(params[:id])
    @package.update(package_params)
    render json: @package
  end

  private

  def package_params
    params.permit(:order_id, :height, :width, :length, :weight, :package_items)
  end
end
