# frozen_string_literal: true

require 'rails_helper'

RSpec.describe HomeController, type: :controller do
  describe '#index' do
    context 'when signed out' do
      it 'should render index' do
        expect(get(:index)).to render_template(:index)
        expect(response.status).to eq(200)
      end
    end

    context 'when signed in' do
      let(:user) { create(:user) }

      it 'renders dashboard when signed out' do
        request.session['user_id'] = user.id
        expect(get(:index)).to render_template(:dashboard)
        expect(response.status).to eq(200)
      end
    end
  end
end
