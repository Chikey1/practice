# frozen_string_literal: true

module BookPagesHelper
  def book_page_facade(book, book_page)
    goals = book_page.goals.map do |goal|
      {
        id: goal.id,
        description: goal.description,
      }
    end

    techniques = book_page.techniques.map do |technique|
      {
        id: technique.id,
        name: technique.name,
        description: technique.description,
      }
    end

    repetoires = book_page.repetoires.map do |repetoire|
      {
        id: repetoire.id,
        title: repetoire.title,
        description: repetoire.description,
      }
    end

    ordered = book.book_pages.order(:practice_date).map { |page| page.id }
    current_page = ordered.index(book_page.id)
    next_page = ordered[current_page + 1]
    previous_page = nil if current_page == 0
    previous_page = ordered[current_page - 1] if current_page > 0

    {
      book: {
        name: book.name,
        id: book.id,
      },
      book_page: {
        id: book_page.id,
        form_date: book_page.practice_date,
        date: book_page.practice_date.to_formatted_s(:long_ordinal),
        goals: goals,
        techniques: techniques,
        repetoire: repetoires,
        other_notes: book_page.other_notes,
        mood: book_page.mood,
        current_page: current_page + 1,
        next_page: next_page,
        previous_page: previous_page,
      },
    }
  end
end
