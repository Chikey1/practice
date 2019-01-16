# frozen_string_literal: true
class BookPage < ApplicationRecord
  belongs_to :book
  has_many :goals, dependent: :destroy
  has_many :techniques, dependent: :destroy
  has_many :repetoires, dependent: :destroy

  validates :practice_date, presence: true
  validates :other_notes, length: { maximum: 600 }
end
