# frozen_string_literal: true

class BookPagesController < ApplicationController
  include BookPagesHelper
  include SessionsHelper
  before_action :ensure_logged_in

  def index
    book = Book.find(params[:book_id])
    @book_pages = book.book_pages.order(:practice_date).map do |page|
      {
        id: page.id,
        date: page.practice_date.to_formatted_s(:long_ordinal),
        goal_preview: page.goals.first&.description,
        mood: page.mood,
      }
    end

    @book = {
      id: book.id,
      name: book.name,
    }

    @react_props = {
      bookPages: @book_pages,
      book: @book,
    }
  end

  def show
    book = current_user.books.find(params[:book_id])
    redirect_to root_path if book.nil?

    book_page = book.book_pages.find(params[:id])
    redirect_to root_path if book_page.nil?

    @react_props = book_page_facade(book, book_page)
  end

  def new
    book = current_user.books.find(params[:book_id])
    @react_props = {
      book: {
        name: book.name,
        id: book.id,
      },
    }
  end

  def create
    book = current_user.books.find(params[:book_id])
    return head :unprocessable_entity if book.nil?
    book_page = BookPage.new(book_id: book.id)
    page_params = book_pages_params(params)

    # save goals
    save_goals = []
    page_params[:goals].map do |goal|
      next if goal[:description].nil?
      if goal[:id].starts_with?('n')
        # new goal
        save_goals.push(Goal.new(
          book_page_id: book_page.id,
          description: goal[:description]
        ))
      end
    end

    # save techniques
    save_techniques = []

    page_params[:techniques].map do |technique|
      next if technique[:description].nil? && technique[:name].nil?
      if technique[:id].starts_with?('n')
        # new technique
        save_techniques.push(Technique.new(
          book_page_id: book_page.id,
          description: technique[:description],
          name: technique[:name],
        ))
      end
    end

    # save repetoire
    save_repetoire = []

    page_params[:repetoire].map do |piece|
      next if piece[:description].nil? && piece[:title].nil?
      if piece[:id].starts_with?('n')
        # new piece
        save_repetoire.push(Repetoire.new(
          book_page_id: book_page.id,
          description: piece[:description],
          title: piece[:title],
        ))
      end
    end

    book_page.practice_date = page_params[:practice_date]
    book_page.other_notes = page_params[:other_notes]
    book_page.mood = page_params[:mood]

    updated = ActiveRecord::Base.transaction do
      book_page.save

      save_goals.each do |goal|
        goal.save
      end

      save_techniques.each do |technique|
        technique.save
      end

      save_repetoire.each do |piece|
        piece.save
      end
    end

    if updated
      redirect_to book_book_page_path(book, book_page)
    else
      head :unprocessable_entity
    end
  end

  def destroy
    book = current_user.books.find(params[:book_id])
    return head :unprocessable_entity if book.nil?
    book_page = book.book_pages.find(params[:id])
    return head :unprocessable_entity if book_page.nil?

    if book_page.destroy
      head :ok, content_type: 'text/html'
    else
      head :unprocessable_entity
    end
  end

  def update
    book = current_user.books.find(params[:book_id])
    return head :unprocessable_entity if book.nil?
    book_page = book.book_pages.find(params[:id])
    return head :unprocessable_entity if book_page.nil?
    page_params = book_pages_params(params)

    # update goals
    current_goals = book_page.goals.map { |goal| goal.id }
    save_goals = []
    page_params[:goals].map do |goal|
      next if goal[:description].nil?
      if goal[:id].starts_with?('n')
        # new goal
        save_goals.push(Goal.new(
          book_page_id: book_page.id,
          description: goal[:description]
        ))
      elsif current_goals.include?(goal[:id].to_i)
        # update existing goal
        id = goal[:id].to_i
        current_goals.delete(id)
        update_goal = Goal.find(id)
        update_goal.description = goal[:description]
        save_goals.push(update_goal)
      end
    end

    delete_goals = current_goals.map do |id|
      Goal.find(id)
    end

    # update techniques
    current_techniques = book_page.techniques.map { |technique| technique.id }
    save_techniques = []

    page_params[:techniques].map do |technique|
      next if technique[:description].nil? && technique[:name].nil?
      if technique[:id].starts_with?('n')
        # new technique
        save_techniques.push(Technique.new(
          book_page_id: book_page.id,
          description: technique[:description],
          name: technique[:name],
        ))
      elsif current_techniques.include?(technique[:id].to_i)
        # update existing technique
        id = technique[:id].to_i
        current_techniques.delete(id)
        update_technique = Technique.find(id)
        update_technique.description = technique[:description]
        update_technique.name = technique[:name]
        save_techniques.push(update_technique)
      end
    end

    delete_techniques = current_techniques.map do |id|
      Technique.find(id)
    end

    # update repetoire
    current_repetoire = book_page.repetoires.map { |piece| piece.id }
    save_repetoire = []

    page_params[:repetoire].map do |piece|
      next if piece[:description].nil? && piece[:title].nil?
      if piece[:id].starts_with?('n')
        # new piece
        save_repetoire.push(Repetoire.new(
          book_page_id: book_page.id,
          description: piece[:description],
          title: piece[:title],
        ))
      elsif current_repetoire.include?(piece[:id].to_i)
        # update existing piece
        id = piece[:id].to_i
        current_repetoire.delete(id)
        update_piece = Repetoire.find(id)
        update_piece.description = piece[:description]
        update_piece.title = piece[:title]
        save_repetoire.push(update_piece)
      end
    end

    delete_repetoire = current_repetoire.map do |id|
      Repetoire.find(id)
    end

    book_page.practice_date = page_params[:practice_date]
    book_page.other_notes = page_params[:other_notes]
    book_page.mood = page_params[:mood]

    updated = ActiveRecord::Base.transaction do
      book_page.save

      save_goals.each do |goal|
        goal.save
      end

      delete_goals.each do |goal|
        goal.delete
      end

      save_techniques.each do |technique|
        technique.save
      end

      delete_techniques.each do |technique|
        technique.delete
      end

      save_repetoire.each do |piece|
        piece.save
      end

      delete_repetoire.each do |piece|
        piece.delete
      end
    end

    if updated
      head :ok, content_type: 'text/html'
    else
      head :unprocessable_entity
    end
  end

  private

  def book_pages_params(params)
    goal_params = params.permit(goals: [:id, :description])[:goals]
    technique_params = params.permit(techniques: [:id, :name, :description])[:techniques]
    repetoire_params = params.permit(repetoire: [:id, :title, :description])[:repetoire]

    note_params = params.permit(:other_notes)[:other_notes]
    note_params = nil if note_params.blank?

    mood_params = params.permit(:mood)[:mood]
    mood_params = nil if mood_params.blank?

    date_params = params.permit(:practice_date)[:practice_date]
    date_params = nil if date_params.blank?

    {
      goals: goal_params,
      techniques: technique_params,
      repetoire: repetoire_params,
      other_notes: note_params,
      mood: mood_params,
      practice_date: date_params,
    }
  end
end
