# frozen_string_literal: true

class BooksController < ApplicationController
  include SessionsHelper
  before_action :ensure_logged_in

  def show
    book = current_user.books.find(params[:id])

    if book.nil?
      redirect_to root_path
    elsif book.book_pages.any?
      redirect_to book_book_page_path(book, book.book_pages.last)
    else
      redirect_to new_book_book_page_path(book)
    end
  end

  def create
    @book = Book.new(book_params(params))
    if @book.save
      head :ok, content_type: 'text/html'
    else
      # TODO: implement error message in front end
      render json: { error_messages: @book.errors.to_a }, status: :unprocessable_entity
    end
  end

  def update
    books = []

    params['_json'].each do |p|
      book_params = update_book_params(p)
      book = current_user.books.find(book_params[:id])
      return head :unprocessable_entity if book.nil?

      book.name = book_params['name']
      book.instrument = book_params['instrument']
      books.push(book)
    end

    updated = ActiveRecord::Base.transaction do
      books.each do |book|
        book.save
      end
    end

    if updated
      head :ok, content_type: 'text/html'
    else
      head :unprocessable_entity
    end
  end

  def destroy
    book = current_user.books.find(params[:id])
    return head :unprocessable_entity if book.nil?
    if book.destroy
      head :ok, content_type: 'text/html'
    else
      head :unprocessable_entity
    end
  end

  private

  def book_params(params)
    params.require(:book).permit(:name, :instrument).merge(user_id: current_user.id)
  end

  def update_book_params(params)
    params.permit(:id, :name, :instrument)
  end
end
