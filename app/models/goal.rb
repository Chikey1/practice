class Goal < ApplicationRecord
  belongs_to :book_page

  validates :description, presence: true, length: { maximum: 200 }
end
