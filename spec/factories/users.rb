# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { 'test name' }
    email { 'test@test.com' }
    password { 'asdf1234' }
    password_confirmation { 'asdf1234' }
  end
end
