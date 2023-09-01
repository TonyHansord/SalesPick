class OrdersController < ApplicationController
  wrap_parameters format: []
  skip_before_action :authorize, only: [:index, :show, :create]

  def index
    @orders = Order.all
    render json: @orders
  end

  def show
    @order = Order.find_by_id(params[:id])
    render json: @order, include: { :items => { product: [:product_image] } }, except: [:created_at, :updated_at]
  end

  def create
    customer = Customer.find_by_id(params[:customer_id])
    @order = customer.orders.create!(order_params)

    render json: @order
  end

  def update
    @order = Order.find_by_id(params[:id])
    @order.update(order_params)
    render json: @order
  end

  def assign
    @order = Order.find_by_id(params[:id])
    @order.update(order_params)
    render json: Order.all
  end

  def destroy
    @order = Order.find_by_id(params[:id])
    @order.destroy
    render json: @order
  end

  private

  def order_params
    params.permit(:id, :customer_id, :user_id, :status, :priority)
  end
end
