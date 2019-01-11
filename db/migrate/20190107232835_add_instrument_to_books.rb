class AddInstrumentToBooks < ActiveRecord::Migration[5.1]
  def change
    add_column :books, :instrument, :integer
  end
end
