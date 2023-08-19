class ProductsController < ApplicationController
  wrap_parameters format: []

  def index
    @products = Product.all
    render json: @products
  end

  def show
    @product = Product.find_by_id(params[:id])
    render json: @product
  end

  def create
    @product = Product.create!(product_params)
    render json: @product
  end

  private

  def product_params
    params.permit(:code, :name, :category, :price, :length, :width, :height, :weight, :current_stock, :assigned_stock, :product_image)
  end
end
