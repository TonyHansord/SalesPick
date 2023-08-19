Rails.application.routes.draw do
  default_url_options :host => Rails.application.config.domain

  resources :products

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
