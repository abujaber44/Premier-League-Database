class UsersController < ApplicationController

    # def index
    #     users = User.all 
    #     render json: users, include: [:teams]
    # end

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

      private

      def user_params
        params.require(:user).permit(:name, :email)
      end

end
