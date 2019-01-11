# frozen_string_literal: true
class BookPage < ApplicationRecord
  belongs_to :book
  has_many :goals

  validates :practice_date, presence: true
end
