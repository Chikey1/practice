# frozen_string_literal: true

class BookPagesController < ApplicationController
  def show
    book = current_user.books.find(params[:book_id])
    redirect_to root_path if book.nil?

    book_page = book.book_pages.find(params[:id])
    redirect_to root_path if book_page.nil?

    @react_props = book_page_facade(book, book_page)
  end

  def new
  end

  private

  def book_page_facade(book, book_page)
    {
      book: {
        name: book.name,
      },
      book_page: {
        date: book_page.practice_date.to_formatted_s(:long_ordinal),
        goals: 'test goals',
        technique: 'test technique',
        repetoire: 'repetoire',
        other_notes: book_page.other_notes,
        mood: book_page.mood,
      },
    }
  end
end
