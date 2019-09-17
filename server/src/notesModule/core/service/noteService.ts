import NoteServicePort from "../noteServicePort";
import NoteRepositoryPort from "../noteRepositoryPort";
import Note from "../domain/note";

export default class NoteService implements NoteServicePort{
    _noteRepository: NoteRepositoryPort;

    constructor(noteRepository: NoteRepositoryPort){
        this._noteRepository = noteRepository;
    }

    saveNote(note: Note){
        return this._noteRepository.save(note);
    }

    selectNoteById(noteId: string){
        return this._noteRepository.selectById(noteId);
    }

    selectNotesByUserName(userName: string){
        return this._noteRepository.selectByUserName(userName);
    }

    deleteNote(noteId: string){
        return this._noteRepository.delete(noteId);
    }
}