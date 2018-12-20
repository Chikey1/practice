# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe '#new' do
    it 'should respond successfully' do
      get :new
      expect(response.status).to eq(200)
    end
  end

  describe '#create' do
    it 'should successfully create a user' do
      user_params = {
        user: {
          name: 'Test',
          email: 'test@test.com',
          password: 'abcabc123',
          password_confirmation: 'abcabc123',
        },
      }
      expect { post :create, params: user_params }.to change(User, :count).by(1)
      expect(User.count).to eq 1
    end
  end
end
