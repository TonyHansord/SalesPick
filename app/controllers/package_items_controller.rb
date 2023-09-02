class PackageItemsController < ApplicationController

    skip_before_action :authorize, only: [:index, :show, :create]
    wrap_parameters format: []

    def index
        @package_items = PackageItem.all
        render json: @package_items
    end
    
    def show
        @package_item = PackageItem.find_by_id(params[:id])
        render json: @package_item
    end
    
    def create
        package = Package.find_by_id(params[:package_id])
        @package_item = PackageItem.create!(package_item_params)
        package.package_items << @package_item
        render json: @package_item
    end
    
    def update
        @package_item = PackageItem.find_by_id(params[:id])
        @package_item.update(package_item_params)
        render json: @package_item
    end
    
    private
    
    def package_item_params
        params.permit(:package_id, :item_id, :quantity)
    end
end
