const xss = require('xss')

const FoldersService = {
  getFolders(db) {
    return db
      .from('folders AS fold')
      .select(
        'fold.id',
        'fold.name'
      )
      .groupBy('fold.id')
  },

  getFolderById(knex, id) {
    return knex
      .from('folders')
      .select('*')
      .where('id', id).first()
  },

  insertFolder(db, newFolder) {
    return db
      .insert(newFolder)
      .into('folders')
  },

  deleteFolder(db, folderId) {
    return db
      .where({ folderId })
      .delete()
  },

  updateFolder(db, folderId, newFolderFields) {
    return db
      .where({ folderId })
      .update(newFolderFields)
  }
}

module.exports = FoldersService