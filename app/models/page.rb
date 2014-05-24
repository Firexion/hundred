class Page < ActiveRecord::Base
  validates :name, presence: true
  validates :week, presence: true
  validates :link, presence: true

end
