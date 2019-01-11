# frozen_string_literal: true

class UsersController < ApplicationController
  def new
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

  private

  def user_params(params)
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
