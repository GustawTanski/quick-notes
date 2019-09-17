import NoteRepositoryPort from "../core/noteRepositoryPort";
import Note from "../core/domain/note";

class MongoDbNotesRepository implements NoteRepositoryPort{
    save(note: Note): Note {
        throw new Error("Method not implemented.");
    }
    
    selectById(noteId: string): Note {
        throw new Error("Method not implemented.");
    }

    selectByUserName(userName: string): Note[] {
        throw new Error("Method not implemented.");
    }

    delete(noteId: string): Note {
        throw new Error("Method not implemented.");
    }
}