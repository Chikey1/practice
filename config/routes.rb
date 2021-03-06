Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root   'home#index'
  get    '/signup',                to: 'users#new'
  post   '/signup',                to: 'users#create'
  get    '/settings',              to: 'users#show'
  post   '/user/update',           to: 'users#update'
  post   '/user/password-change',  to: 'users#password_change'
  get    '/signin',                to: 'sessions#new'
  post   '/signin',                to: 'sessions#create'
  delete '/logout',                to: 'sessions#destroy'

  resources :users, only: :destroy

  resources :books,   only: [:show, :create, :destroy] do
    resources :book_pages, only: [:show, :new, :destroy, :create, :index]
  end

  post '/books/update', to: 'books#update'
  post '/books/:book_id/book_pages/:id', to: 'book_pages#update'
end
