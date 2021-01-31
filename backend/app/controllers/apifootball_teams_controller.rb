class ApifootballTeamsController < ApplicationController
    
    include Apifootball

        def index
            @response = Apifootball::APITeams.getallteams
            render json: @response.body
        end

        def user_teams
            user = User.find_by_id(params[:id])
                if user 
            teams = user.teams
            teams_collection = teams.map do |team|
                 team.team_name
            end
            @response = Apifootball::APITeams.getallteams
            all_teams = JSON.parse(@response.body)
            like_teams = all_teams.select {|team| team['team_name'] ==  teams_collection[0] || team['team_name'] == teams_collection[1] || team['team_name'] == teams_collection[2]}
            render json: like_teams
                else
                    render json: {error: "No user found", status: 400}, status: 400
                end 
        end

end
