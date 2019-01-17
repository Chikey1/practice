# frozen_string_literal: true

class UsersController < ApplicationController
  include SessionsHelper
  before_action :ensure_logged_in, only: [:show, :update, :password_change, :destroy]

  def new
  end

  def show
    @react_props = {
      user: {
        id: current_user.id,
        name: current_user.name,
        email: current_user.email,
        created_at: current_user.created_at.to_date.to_formatted_s(:long_ordinal),
      }
    }
  end

  def create
    @user = User.new(user_params(params))
    if @user.save
      log_in(@user)
      head :ok, content_type: 'text/html'
    else
      # TODO: implement error message in front end
      render json: { error_messages: user.errors.to_a }, status: :unprocessable_entity
    end
  end

  def update
    permitted_params = params.require(:user).permit(:name)
    if current_user.update_attributes(permitted_params)
      head :ok, content_type: 'text/html'
    else
      head :unprocessable_entity
    end
  end

  def password_change
    if current_user.authenticate(params[:user][:current_password])
      permitted_params = params.require(:user).permit(:password, :password_confirmation)
      if current_user.update_attributes(permitted_params)
        head :ok, content_type: 'text/html'
      else
        head :unprocessable_entity
      end
    else
      head :unauthorized
    end
  end

  def destroy
    if current_user.authenticate(params[:user][:password])
      if current_user.destroy
        head :ok, content_type: 'text/html'
      else
        head :unprocessable_entity
      end
    else
      head :unauthorized
    end
  end

  private

  def user_params(params)
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
