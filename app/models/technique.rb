class Technique < ApplicationRecord
  belongs_to :book_page

  validates :name, presence: true, length: { maximum: 15 }
  validates :description, presence: true, length: { maximum: 400 }
end
