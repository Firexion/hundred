class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.string  :name
      t.integer :week
      t.string  :link
      t.text    :description

      t.timestamps
    end
  end
end
