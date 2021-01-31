Rails.application.routes.draw do
  resources :teams
  resources :users
  get '/allteams' => 'apifootball_teams#index'
  get '/user_teams/:id' => 'apifootball_teams#user_teams'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
