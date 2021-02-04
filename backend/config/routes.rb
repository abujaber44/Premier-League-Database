Rails.application.routes.draw do
  resources :teams, only: [:show, :create]
  resources :users 

  delete '/users/:id/teams/:team_name' => 'users#delete_team'  
  get '/allteams' => 'apifootball_teams#index'
  get '/user_teams/:id' => 'apifootball_teams#user_teams'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
