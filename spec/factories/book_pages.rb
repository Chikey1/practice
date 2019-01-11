# frozen_string_literal: true
FactoryBot.define do
  factory :book_page do
    book
    date Date.new(2007, 11, 10)
  end
end
