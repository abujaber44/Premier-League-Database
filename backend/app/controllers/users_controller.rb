class UsersController < ApplicationController

    def show
        user = User.find_by_id(params[:id])
        if user 
            render json: user, include: [:teams]
        else
            render json: {message: "User not found"}
        end 
    end

    def create
        user = User.find_or_create_by(email: params[:email]) 
        user.name = params[:name]
        if user.save 
            render json: user 
        else
            render json: {error: "Unable to create user", status: 400}, status: 400
        end
    end     

    
    def delete_team
        team = Team.find_by(user_id: params[:id], team_name: params[:team_name])
        if !team
          render json: {error: "No team by that name", status: 400}, status: 400
        else
          team.destroy
          render json: team, include: [:user]
        end
    end

      private

      def user_params
        params.require(:user).permit(:name, :email)
      end
end
