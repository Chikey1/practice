require 'rails_helper'

describe User do
  let(:user) { FactoryBot.build :user }

  it 'has a valid Factory' do
    expect(user.valid?).to be true
  end

  it 'requires name' do
    user.name = ''
    expect(user.valid?).to be false
  end

  it 'should enforce a maximum name length' do
    user.name = 'a' * 51
    expect(user.valid?).to be false
  end

  it 'requires email' do
    user.email = '     '
    expect(user.valid?).to be false
  end

  it 'should enforce a maximum email length' do
    user.email = 'a' * 244 + '@example.com'
    expect(user.valid?).to be false
  end

  it 'should accept valid email addresses' do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
      first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      user.email = valid_address
      expect(user.valid?).to be true
    end
  end

  it 'should reject invalid email addresses' do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                           foo@bar_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      user.email = invalid_address
      expect(user.valid?).to be false
    end
  end

  it 'should reject duplicate email addresses' do
    user.save!
    duplicate_user = user.dup
    expect(duplicate_user.valid?).to be false
  end

  it 'should save email addresses as lower-case' do
    mixed_case_email = 'FOO@BAR.Com'
    user.email = mixed_case_email
    user.save!
    expect(user.email).to eq mixed_case_email.downcase
  end

  it 'should require a password' do
    user.password = user.password_confirmation = ' ' * 6
    expect(user.valid?).to be false
  end

  it 'should enforce a minimum password length' do
    user.password = user.password_confirmation = 'a' * 6
    expect(user.valid?).to be false
  end

  it 'should enforce a maximum password length' do
    user.password = user.password_confirmation = ('3' * 20) + ('a' * 20)
    expect(user.valid?).to be false
  end

  it 'should require a number in the password' do
    user.password = user.password_confirmation = 'a' * 20
    expect(user.valid?).to be false
  end

  it 'should require a letter in the password' do
    user.password = user.password_confirmation = '3' * 20
    expect(user.valid?).to be false
  end
end