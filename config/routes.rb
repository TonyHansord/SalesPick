Rails.application.routes.draw do
  default_url_options :host => Rails.application.config.domain

  get "/api/packages", to: "packages#index"
  get "/api/packages/:id", to: "packages#show"
  post "/api/packages", to: "packages#create"
  patch "/api/packages/:id", to: "packages#update"
  delete "/api/packages/:id", to: "packages#destroy"

  get "/api/package_items", to: "package_items#index"
  get "/api/package_items/:id", to: "package_items#show"
  post "/api/package_items", to: "package_items#create"
  patch "/api/package_items/:id", to: "package_items#update"
  delete "/api/package_items/:id", to: "package_items#destroy"

  get "/api/items", to: "items#index"
  get "/api/items/:id", to: "items#show"
  post "/api/items", to: "items#create"
  patch "/api/items/:id", to: "items#update"
  delete "/api/items/:id", to: "items#destroy"

  get "/api/products", to: "products#index"
  get "/api/products/:id", to: "products#show"
  post "/api/products", to: "products#create"
  patch "/api/products/:id", to: "products#update"
  delete "/api/products/:id", to: "products#destroy"

  get "/api/orders", to: "orders#index"
  get "/api/orders/:id", to: "orders#show"
  post "/api/orders", to: "orders#create"
  patch "/api/orders/:id", to: "orders#update"
  post "/api/orders/:id/photos", to: "orders#add_photos"
  patch "/api/orders/:id/assign", to: "orders#assign"
  delete "/api/orders/:id", to: "orders#destroy"

  get "/api/customers", to: "customers#index"
  get "/api/customers/:id", to: "customers#show"
  post "/api/customers", to: "customers#create"
  patch "/api/customers/:id", to: "customers#update"
  delete "/api/customers/:id", to: "customers#destroy"

  get "/api/users", to: "users#index"
  get "/api/user", to: "users#show"
  post "/api/users", to: "users#create"
  patch "/api/users/:id", to: "users#update"
  delete "/api/users/:id", to: "users#destroy"

  post "/api/login", to: "sessions#create"
  delete "/api/logout", to: "sessions#destroy"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
