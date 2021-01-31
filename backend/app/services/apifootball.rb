module Apifootball
    
    class APITeams
      def self.getallteams
        Faraday.get 'https://apiv2.apifootball.com/?action=get_teams&league_id=148'+ '&APIkey=' + ENV['API_KEY']
      end
    end
  end

