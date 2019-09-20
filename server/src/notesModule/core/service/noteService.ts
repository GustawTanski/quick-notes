import NoteServicePort from "../noteServicePort";
import NoteRepositoryPort from "../noteRepositoryPort";
import Note from "../domain/note";

export default class NoteService implements NoteServicePort{
    _noteRepository: NoteRepositoryPort;

    constructor(noteRepository: NoteRepositoryPort){
        this._noteRepository = noteRepository;
    }

    async saveNote(note: Note){
        return this._noteRepository.save(note);
    }

    async selectNoteById(noteId: string, authorId: string){
        return this._noteRepository.selectById(noteId, authorId);
    }

    async selectNotesByAuthorId(authorId: string){
        return this._noteRepository.selectByAuthorId(authorId);
    }

    async deleteNote(noteId: string, authorId: string){
        let noteToBeDeleted = this._noteRepository.selectById(noteId, authorId);
        if(noteToBeDeleted) {
            return this._noteRepository.delete(noteId);
        }
        else {
            throw new Error("Note not found.");
        }
    }
}