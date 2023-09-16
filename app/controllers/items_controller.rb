class ItemsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :create]
  wrap_parameters format: []

  def index
    @items = Item.all
    render json: @items
  end

  def show
    @item = Item.find_by_id(params[:id])
    render json: @item
  end

  def create
    order = Order.find_by_id(params[:order_id])
    @item = Item.create!(item_params)
    order.items << @item
    render json: @item
  end

  def update
    @item = Item.find_by_id(params[:id])
    @item.update(item_params)
    render json: @item
  end

  def destroy
    @order = Order.find_by_id(params[:order_id])
    @item = Item.find_by_id(params[:id])
    @item.delete
    render json: @order
  end

  private

  def item_params
    params.permit(:order_id, :product_id, :quantity, :assigned_quantity, :picked_quantity)
  end
end
