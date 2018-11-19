class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
    render layout: 'dark_layout'
  end
end
