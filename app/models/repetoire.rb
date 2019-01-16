class Repetoire < ApplicationRecord
  belongs_to :book_page

  validates :title, presence: true, length: { maximum: 30 }
  validates :description, presence: true, length: { maximum: 400 }
end
