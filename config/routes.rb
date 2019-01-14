Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'
  get    '/signup',   to: 'users#new'
  post   '/signup',   to: 'users#create'
  get    '/signin',   to: 'sessions#new'
  post   '/signin',   to: 'sessions#create'
  delete '/logout',   to: 'sessions#destroy'
  resources :books,   only: [:show, :create, :destroy] do
    resources :book_pages, only: [:show, :new]
  end
  post '/books/update', to: 'books#update'
end
