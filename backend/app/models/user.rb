class User < ApplicationRecord
    has_many :teams
    validates :email, presence: true, uniqueness: true
    validates :name, presence: true
    #validates_length_of :teams, maximum: 4
    #validate :limit_teams


 private
    def limit_teams
        #return if teams.blank?
        errors.add(:teams, "too much") if teams.size > 4
    end 
end


  
