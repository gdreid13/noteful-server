const xss = require('xss')

const NotesService = {
  getNotes(db) {
    return db
      .from('notes')
      .select(
        'notes.id',
        'notes.name',
        'notes.content',
        'notes.modified'
      )
      .groupBy('notes.folder_id')
  },

  insertNote(db, newNote) {
    return db
      .insert(newNote)
      .into('notes')
  },

  deleteNote(db, noteId) {
    return db
      .where({ noteId })
      .delete()
  },

  updateNote(db, noteId, newNoteFields) {
    return db
      .where({ noteId })
      .update(newNoteFields)
  }
}

module.exports = NotesService