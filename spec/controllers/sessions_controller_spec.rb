require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe '#new' do
    it 'should respond successfully' do
      get :new
      expect(response.status).to eq(200)
    end
  end

  describe '#create' do
    let(:user) { create(:user) }

    context 'when the email and password combination is correct' do
      before :each do
        post :create, params: {
          session: {
            email: user.email,
            password: 'asdf1234',
          },
        }
      end

      it 'should sign in the user' do
        expect(request.session['user_id']).to be user.id
      end

      it 'should redirect the user to root_path' do
        expect(response).to redirect_to root_path
      end
    end

    context 'when the email does not exist in the database' do
      before :each do
        post :create, params: {
          session: {
            email: 'imaginary@email.com',
            password: 'incorrectPassword1',
          },
        }
      end

      it 'should not sign in the user' do
        expect(request.session['user_id']).to be nil
      end

      it 'should return the correct error message' do
        expect(assigns(:error)).to match 'Email not registered.'
      end
    end

    context 'when the email and password combination is incorrect' do
      before :each do
        post :create, params: {
          session: {
            email: user.email,
            password: 'incorrectPassword1',
          },
        }
      end

      it 'should not sign in the user' do
        expect(request.session['user_id']).to be nil
      end

      it 'should return the correct error message' do
        expect(assigns(:error)).to match 'Invalid email/password combination'
      end
    end
  end

  describe '#destroy' do
    let(:user) { create(:user) }

    before :each do
      request.session['user_id'] = user.id
      post :destroy
    end

    it 'should sign out the user' do
      expect(request.session['user_id']).to be nil
    end

    it 'should redirect the user to root_path' do
      expect(response).to redirect_to root_path
    end
  end
end