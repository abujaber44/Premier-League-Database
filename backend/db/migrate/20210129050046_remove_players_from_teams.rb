class RemovePlayersFromTeams < ActiveRecord::Migration[6.0]
  def change
    remove_column :teams, :players
  end
end
