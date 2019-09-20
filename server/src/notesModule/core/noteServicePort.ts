import Note from "./domain/note";

export default interface NoteServicePort{
    saveNote(note: Note): Promise<Note>;
    selectNoteById(noteId: string, authorId: string): Promise<Note>;
    selectNotesByAuthorId(authorId: string): Promise<Note[]>;
    deleteNote(noteId: string, authorId: string): Promise<Note>;
}