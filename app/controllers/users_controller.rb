class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create, :index]

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

  def create
    user = User.create!(user_params)
    render json: user, status: :created
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    head :no_content
  end

  private

  def user_params
    params.permit(:first_name, :last_name, :username, :password, :password_confirmation, :role)
  end
end
