import NoteRepositoryPort from "../core/noteRepositoryPort";
import Note from "../core/domain/note";

export default class MockRepo implements NoteRepositoryPort{
    save(note: Note): Note {
        console.log("REPOSITORY: saved with mock repo: "+note);
        return note;
    }

    selectById(noteId: string): Note {
        if(noteId==="1"){
            console.log("REPOSITORY: found a note with id: "+noteId);
            return new Note(noteId,"someone","nothing to see here");
        }
        else throw new Error("REPOSITORY: a note with id: "+noteId+" not found.");
    }

    selectByUserName(userName: string): Note[] {
        console.log("REPOSITORY: notes found for the user "+userName);
        return [];
    }
    
    delete(noteId: string): Note {
        throw new Error("REPOSITORY: a note with id: "+noteId+" not found.");
    }


}