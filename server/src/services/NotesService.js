import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class NotesService {
    async destroyNote(noteId, userId) {
        const note = await dbContext.Notes.findById(noteId)
        if (!note) {
            return new BadRequest('this is not a valid note id')
        }
        if (note.creatorId.toString() != userId) {
            throw new Forbidden('Not your note to destroy!')
        } await note.delete()
        return "this note has been deleted!"
    }
    async getNotesByProjectId(projectId) {
        const notes = await dbContext.Notes.find({ projectId: projectId })
            .populate('creator', 'name picture email ')
        return notes
    }
    async createNote(noteData) {
        const note = await dbContext.Notes.create(noteData)
        await note.populate('creator', 'name picture email')
        return note
    }

}

export const notesService = new NotesService()