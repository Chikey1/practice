# frozen_string_literal: true

class BooksController < ApplicationController
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

  private

  def book_params(params)
    params.require(:book).permit(:name, :instrument).merge(user_id: current_user.id)
  end
end
