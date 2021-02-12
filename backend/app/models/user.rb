class User < ApplicationRecord
    has_many :teams
    validates :email, presence: true, uniqueness: true
    validates :name, presence: true
    
end 


  
