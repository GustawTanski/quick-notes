import Note from "./domain/note";

export default interface NoteRepositoryPort{
    save(note: Note): Note;
    selectById(noteId: string): Note;
    selectByUserName(userName: string): Note[];
    delete(noteId: string): Note;
}