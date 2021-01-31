class CreateTeams < ActiveRecord::Migration[6.0]
  def change
    create_table :teams do |t|
      t.string :team_name
      t.string :team_badge
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
