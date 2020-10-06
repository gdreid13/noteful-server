const path = require('path')
const express = require('express')
const xss = require('xss')
const NotesService = require('./notes-service')

const notesRouter = express.Router()
const jsonParser = express.json()

const serializeNote = note => ({
  id: note.id,
  folder_id: note.folder_id,
  name: xss(note.name),
  content: xss(note.content),
  modified: xss(note.modified)
})

notesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    NotesService.getNotes(knexInstance)
      .then(notes => {
        res.json(notes.map(serializeNote))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { folder_id, name, content, modified } = req.body
    const newNote = { folder_id, name, content, modified }

    for (const [key, value] of Object.entries(newNote))
    if (value == null)
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` }
      })
    
    NotesService.insertNote(
      req.app.get('db'),
      newNote
    )
      .then(note => {
        res
          .status(201)
          .location(`/notes/${note.id}`)
          .json(serializeNote(note))
      })
      .catch(next)
  })

  notesRouter
    .route('/:note_id')
/*     .all((req, res, next) => {
      NotesService.getNoteById(
        req.app.get('db'),
        req.params.note_id
      )
      .then(note => {
        if (!note) {
          return res.status(404).json({
            error: { message: `Note doesn't exist` }
          })
          res.note = note
          next()
        }
      })
      .catch(next)
    }) */
    .get((req, res, next) => {
      console.log(req.params)
      const id = req.params.note_id
      console.log(id)
      NotesService.getNoteById(
        req.app.get('db'),
        id
      )
      .then(note => {
        res.status(201).json(note)
      })
      .catch(next) 
    })
    .delete((req, res, next) => {
      console.log(req.params)
      const id = req.params.note_id
      console.log(id)
      NotesService.deleteNote(
        req.app.get('db'),
        id
      )
      .then((note)=> {
        res.status(204).end()
      })
      .catch(next)
  })

  module.exports = notesRouter