class OrdersController < ApplicationController
  wrap_parameters format: []

  def index
    @orders = Order.all
    render json: @orders
  end

  def show
    @order = Order.find_by_id(params[:id])
    render json: @order, include: [{ :items => { product: [:product_image] } }, { :packages => { package_items: [:product_name] } }], except: [:created_at, :updated_at]
  end

  def create
    customer = Customer.find_by_id(params[:customer_id])
    @order = customer.orders.create!(order_params)
    render json: @order
  end

  def update
    @order = Order.find_by_id(params[:id])
    if @order.status == "complete"
      render json: { error: "You can't amend a complete order" }
    else
      @items = @order.items
      @items.each do |item|
        @product = Product.find_by_id(item.product_id)
        @product.update(assigned_stock: @product.assigned_stock + (item.quantity - item.assigned_quantity))
        item.update(assigned_quantity: item.quantity)
      end
      render json: { message: "Order Updated" }
    end
  end

  def add_photos
    @order = Order.find_by_id(params[:id])
    @order.order_images.attach(params[:order_images])
    render json: @order
  end

  def remove_photos
    @order = Order.find_by_id(params[:id])
    @order.order_images[params[:photo_id].to_i].purge
    render json: @order
  end

  def assign
    @order = Order.find_by_id(params[:id])
    @order.update(order_params)
    render json: Order.all
  end

  def complete_order
    @order = Order.find_by_id(params[:id])

    if check_all_items_picked
      @order.items.each do |item|
        product = Product.find_by_id(item.product_id)
        product.update(current_stock: product.current_stock - item.picked_quantity, assigned_stock: product.assigned_stock - item.picked_quantity)
      end
      @order.update(status: params[:status])
      render json: { message: "Order Completed" }
    else
      render json: { message: "Not all items have been picked " }
    end
  end

  def destroy
    @order = Order.find_by_id(params[:id])
    @order.destroy
    render json: @order
  end

  private

  def order_params
    params.permit(:id, :customer_id, :user_id, :status, :priority, :packages, :order_images)
  end

  def check_all_items_picked
    order_complete = true
    @order.items.each do |item|
      if item.picked_quantity < item.assigned_quantity
        order_complete = false
      end
    end
    order_complete
  end
end
