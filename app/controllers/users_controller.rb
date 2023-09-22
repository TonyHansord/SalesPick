class UsersController < ApplicationController
  wrap_parameters format: []
  before_action only: [:create, :destroy] do authorize_role(["admin"]) end

  def index
    users = User.all
    render json: users
  end

  def show
    if session[:user_id]
      user = User.find(session[:user_id])
      render json: user
    else
      render json: { errors: ["Not authorized"] }, status: :unauthorized
    end
  end

  def get_user
    user = User.find(params[:id])
    render json: user
  end

  def create
    user = User.create!(user_params)
    render json: user, status: :created
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    render json: { message: "User Updated" }
  end

  def update_password
    user = User.find(params[:id])
    user.update(:password => params[:password], :password_confirmation => params[:password_confirmation])
    render json: { message: "Password Updated" }
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    render json: { message: "User Deleted" }
  end

  private

  def user_params
    params.permit(:id, :first_name, :last_name, :username, :password, :password_confirmation, :role)
  end
end
