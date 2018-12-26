# frozen_string_literal: true
class BookPage < ApplicationRecord
  belongs_to :book
  validates :practice_date, presence: true
end
