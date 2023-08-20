class CustomersController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :create]
  wrap_parameters format: []

  def index
    @customers = Customer.all
    render json: @customers
  end

  def show
    @customer = Customer.find_by_id(params[:id])
    render json: @customer
  end

  def create
    @customer = Customer.create!(customer_params)
    render json: @customer
  end

  private

  def customer_params
    params.permit(:name, { :address => [:street, :suburb, :state, :postcode] }, :phone_number, :email)
  end
end
