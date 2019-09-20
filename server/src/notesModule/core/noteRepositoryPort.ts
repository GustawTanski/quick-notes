import Note from "./domain/note";

export default interface NoteRepositoryPort{
    /**
     * Saves a note to the database
     * @param note a Note object containing data to be persisted
     */
    save(note: Note): Promise<Note>;

    /**
     * Retrieves a note with matching author and note ids
     * @param noteId 
     * @param authorId 
     */
    selectById(noteId: string, authorId: string): Promise<Note>;

    /**
     * Retrieves all notes of the author specified by id
     * @param authorId 
     */
    selectByAuthorId(authorId: string): Promise<Note[]>;

    /**
     * Deletes a note specified by id
     * @param noteId 
     */
    delete(noteId: string): Promise<Note>;
}