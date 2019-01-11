# frozen_string_literal: true

FactoryBot.define do
  factory :book do
    user
    name { 'test book' }
    instrument { 'other' }
  end
end
