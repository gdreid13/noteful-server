const xss = require('xss')

const NotesService = {
  getNotes(db) {
    return db
      .from('notes')
      .select('*')
      .groupBy('notes.id', 'notes.folder_id')
  },

  insertNote(db, newNote) {
    return db
      .from('notes')
      .insert(newNote)
  },

  deleteNote(db, noteId) {
    return db
      .from('notes')
      .where({ noteId })
      .delete()
  },

  updateNote(db, noteId, newNoteFields) {
    return db
      .from('notes')
      .where({ noteId })
      .update(newNoteFields)
  }
}

module.exports = NotesService