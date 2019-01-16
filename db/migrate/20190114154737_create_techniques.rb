class CreateTechniques < ActiveRecord::Migration[5.1]
  def change
    create_table :techniques do |t|
      t.references :book_page, foreign_key: true
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
