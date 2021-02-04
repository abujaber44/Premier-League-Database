class TeamsController < ApplicationController

      # def index
      #   teams = Team.all
      #   render json: teams, include: [:user]
      # end
    
      def show
        team = Team.find_by_id(params[:id])
        if !team
          render json: {error: "No team by that ID", status: 400}, status: 400
        else
          render json: team, include: [:user]
        end
      end
    
      def create
        team = Team.new(team_params)
        user = team.user 
        if user.teams.exists?(:team_name => team.team_name) || user.teams.count > 2
          render json:{ error: "Unable to add this team", status: 400}, status: 400
          else
            team.save 
            render json: team
         end
      end     
    
      # def destroy
      #   team = Team.find_by(user_id: params[:user_id], team_name: params[:team_name])
      #   if !team
      #     render json: {error: "No team by that name", status: 400}, status: 400
      #   else
      #     team.destroy
      #     render json: team, include: [:user]
      #   end
      # end

      

      private

      def team_params
        params.require(:team).permit(:team_name, :team_badge, :user_id)
      end
end
