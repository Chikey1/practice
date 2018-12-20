class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books do |t|
      t.references :user,   foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
