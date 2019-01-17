# frozen_string_literal: true

class User < ApplicationRecord
  before_save { email.downcase! }

  has_many :books, dependent: :destroy

  validates :name, presence: true, length: { maximum: 50 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }

  VALID_PASSWORD_REGEX = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/.freeze

  has_secure_password

  validates :password, presence: true, length: { maximum: 30 },
    format: { with: VALID_PASSWORD_REGEX }, allow_nil: true
end
