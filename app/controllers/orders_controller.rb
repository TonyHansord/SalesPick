class OrdersController < ApplicationController
  wrap_parameters format: []
  skip_before_action :authorize, only: [:index, :show, :create]

  def index
    @orders = Order.all
    render json: @orders
  end

  def show
    @order = Order.find_by_id(params[:id])
    render json: @order
  end

  def create
    customer = Customer.find_by_id(params[:customer_id])
    products = params[:products]
    @order = customer.orders.create!(order_params)
    products.each do |product|
      @order.products << Product.find_by_id(product[:id])
    end

    render json: @order
  end

  private

  def order_params
    params.permit(:customer_id, :user, :status, :priority)
  end
end
