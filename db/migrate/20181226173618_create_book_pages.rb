class CreateBookPages < ActiveRecord::Migration[5.1]
  def change
    create_table :book_pages do |t|
      t.references :book,   foreign_key: true
      t.date :practice_date

      t.timestamps
    end
  end
end
