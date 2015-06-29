class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :description, null: false
      t.boolean :done, null: false, default: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
  end
end
