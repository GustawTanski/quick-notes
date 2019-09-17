import Note from "./domain/note";

export default interface NoteServicePort{
    saveNote(note: Note): Note;
    selectNoteById(noteId: string): Note;
    selectNotesByUserName(userName: string): Note[];
    deleteNote(noteId: string): Note;
}