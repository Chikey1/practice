# frozen_string_literal: true

class Book < ApplicationRecord
  belongs_to :user
  validates :name, presence: true, length: { maximum: 20 }
end
