class AddNotesToBookPages < ActiveRecord::Migration[5.1]
  def change
    add_column :book_pages, :other_notes, :string
    add_column :book_pages, :mood, :integer
  end
end
