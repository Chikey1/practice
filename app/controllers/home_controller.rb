# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    if logged_in?
      @books = current_user.books.map do |book|
        {
          id: book.id,
          name: book.name,
        }
      end

      render :dashboard, layout: 'layouts/light_layout'
    else
      render :index
    end
  end
end
