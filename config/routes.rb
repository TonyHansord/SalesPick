Rails.application.routes.draw do
  resources :items
  default_url_options :host => Rails.application.config.domain

  get "/products", to: "products#index"
  get "/products/:id", to: "products#show"
  post "/products", to: "products#create"
  patch "/products/:id", to: "products#update"
  delete "/products/:id", to: "products#destroy"

  get "/orders", to: "orders#index"
  get "/orders/:id", to: "orders#show"
  post "/orders", to: "orders#create"
  patch "/orders/:id", to: "orders#update"
  patch "/orders/:id/assign", to: "orders#assign"
  delete "/orders/:id", to: "orders#destroy"

  get "/customers", to: "customers#index"
  get "/customers/:id", to: "customers#show"
  post "/customers", to: "customers#create"
  patch "/customers/:id", to: "customers#update"
  delete "/customers/:id", to: "customers#destroy"

  get "/users", to: "users#index"
  get "/user", to: "users#show"
  post "/users", to: "users#create"
  patch "/users/:id", to: "users#update"
  delete "/users/:id", to: "users#destroy"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
