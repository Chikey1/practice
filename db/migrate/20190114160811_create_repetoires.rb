class CreateRepetoires < ActiveRecord::Migration[5.1]
  def change
    create_table :repetoires do |t|
      t.references :book_page, foreign_key: true
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
