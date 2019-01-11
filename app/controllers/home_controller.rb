# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    if logged_in?
      @react_props = dashboard_facade

      render :dashboard
    else
      render :index
    end
  end

  private

  def dashboard_facade
    books = current_user.books.map do |book|
      {
        id: book.id,
        name: book.name,
        instrument: book.instrument,
        entries: book.book_pages.count,
      }
    end

    {
      books: books,
      user_name: current_user.name,
      instrument_categories: Book.instruments.keys,
    }

  end
end
