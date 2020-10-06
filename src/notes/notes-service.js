const NotesService = {
  getNotes(db) {
    return db
      .from('notes')
      .select('*')
      .groupBy('notes.id', 'notes.folder_id')
  },

  getNoteById(db, noteId) {
    return db
      .select('*')
      .from('notes')
      .where('id', noteId);
  },

  insertNote(db, newNote) {
    return db
      .from('notes')
      .insert(newNote)
  },

  deleteNote(db, noteId) {
    return db('notes')
      .where('id', noteId)
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