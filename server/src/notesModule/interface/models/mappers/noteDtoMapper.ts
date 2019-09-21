import Note from "../../../core/domain/note";
import NewNoteDto from "../newNoteDto";
import "automapper-ts/dist/automapper";
import PersistedNoteDto from "../persistedNoteDto";

export default class NoteDtoMapper{
    constructor(){
        automapper.createMap("NewNoteDto","Note");
        automapper.createMap("PersistedNoteDto","Note");
        automapper.createMap("Note","PersistedNoteDto").convertToType(PersistedNoteDto);
    }

    noteToPersistedNoteDto(note: Note): NewNoteDto{
        return automapper.map("Note","NoteDto",note);
    }

    newNoteDtoToNote(dto: NewNoteDto): Note{
        return new Note(automapper.map("NewNoteDto","Note",dto));
    }

    persistedNoteDtoToNote(dto: PersistedNoteDto): Note{
        return new Note(automapper.map("PersistedNoteDto","Note",dto));
    }
}