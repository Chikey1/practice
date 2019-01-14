# frozen_string_literal: true

class Book < ApplicationRecord
  belongs_to :user
  has_many :book_pages, dependent: :destroy

  INSTRUMENTS = [
    :piano,
    :violin,
    :cello,
    :guitar,
    :bass,
    :recorder,
    :flute,
    :clarinet,
    :saxophone,
    :trumpet,
    :trombone,
    :drum,
    :other,
  ].freeze

  enum instrument: INSTRUMENTS

  validates :instrument, presence: true
  validates :name, presence: true, length: { maximum: 12 }
end
