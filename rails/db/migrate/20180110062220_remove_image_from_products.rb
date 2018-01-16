class RemoveImageFromProducts < ActiveRecord::Migration[5.1]
  def up
    remove_column :products, :image
  end
  def down
    add_column :products, :image, :text
  end
end
