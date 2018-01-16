class RenameNameToContent < ActiveRecord::Migration[5.1]
  def change
    rename_column :images, :name, :content
  end
end
