class User < ApplicationRecord
  has_secure_password
  has_many :orders

  validates :username, presence: true, uniqueness: true

  enum role: [:admin, :sales, :warehouse]

  def full_name
    "#{first_name} #{last_name}"
  end
end
