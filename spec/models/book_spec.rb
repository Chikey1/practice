# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Book, type: :model do
  let(:book) { FactoryBot.build :book }

  it 'has a valid Factory' do
    expect(book.valid?).to be true
  end

  it 'must have a name' do
    book.name = nil
    expect(book.valid?).to be false
  end

  it 'must have a name shorter than 20 characters' do
    book.name = 'a' * 60
    expect(book.valid?).to be false
  end
end
