# frozen_string_literal: true

class SessionsController < ApplicationController
  def new; end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if !user
      @error = 'Email not registered.'
    elsif user.authenticate(params[:session][:password])
      log_in(user)
      redirect_to root_path
      return
    else
      @error = 'Invalid email/password combination'
    end
    render :new
  end

  def destroy
    log_out
    redirect_to root_url
  end
end
