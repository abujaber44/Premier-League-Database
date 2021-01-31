class AddPlayerstoTeams < ActiveRecord::Migration[6.0]
    def change
      add_column :teams, :players, :string
    end
end
