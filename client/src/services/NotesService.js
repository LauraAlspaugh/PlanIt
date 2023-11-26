import { AppState } from "../AppState.js"
import { Note } from "../models/Note.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class NotesService{
async createNote(noteData){
    const res = await api.post('api/notes', noteData)
    logger.log('creating a note!')
    const newNote = new Note(res.data)
    AppState.notes.push(newNote)
}
async destroyNote(noteId){
    const res = await api.delete(`api/notes/${noteId}`)
    logger.log('destroying this note!')
    const noteIndex = AppState.notes.findIndex(note => note.id == noteId)
    if (noteIndex == -1) { throw new Error('no note with this id') }
    AppState.notes.splice(noteIndex, 1)
}
}

export const notesService =  new NotesService()