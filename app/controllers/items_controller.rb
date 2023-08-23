class ItemsController < ApplicationController
  def index
    @items = Item.all
    render json: @items
  end

  def show
    @item = Item.find_by_id(params[:id])
    render json: @item
  end

  def create
    @item = Item.create!(item_params)
    render json: @item
  end

  private

  def item_params
    params.permit(:product, :quantity)
  end
end
