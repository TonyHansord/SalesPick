class CustomersController < ApplicationController
  wrap_parameters format: []
  before_action do authorize_role(["admin", "sales"]) end

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
