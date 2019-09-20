import NoteServicePort from "../noteServicePort";
import NoteRepositoryPort from "../noteRepositoryPort";
import Note from "../domain/note";

export default class NoteService implements NoteServicePort{
    private noteRepository: NoteRepositoryPort;

    constructor(noteRepository: NoteRepositoryPort){
        this.noteRepository = noteRepository;
    }

    async saveNote(note: Note){
        return this.noteRepository.save(note);
    }

    async selectNoteById(noteId: string, authorId: string){
        return this.noteRepository.selectById(noteId, authorId);
    }

    async selectNotesByAuthorId(authorId: string){
        return this.noteRepository.selectByAuthorId(authorId);
    }

    async deleteNote(noteId: string, authorId: string){
        let noteToBeDeleted = await this.noteRepository.selectById(noteId, authorId);
        if(noteToBeDeleted) {
            return this.noteRepository.delete(noteId);
        }
        else {
            throw new Error("Note not found.");
        }
    }
}