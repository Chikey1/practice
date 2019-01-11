class CreateGoals < ActiveRecord::Migration[5.1]
  def change
    create_table :goals do |t|
      t.references :book_page, foreign_key: true
      t.string :description

      t.timestamps
    end
  end
end
