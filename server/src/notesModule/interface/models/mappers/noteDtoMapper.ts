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

    noteToPersistedNoteDto(note: Note): PersistedNoteDto{
        return automapper.map("Note","PersistedNoteDto",note);
    }

    newNoteDtoToNote(dto: NewNoteDto, authorId: string): Note{
        const automapped = automapper.map("NewNoteDto","Note",dto);
        automapped.authorId = authorId;
        return new Note(automapped);
    }

    /*persistedNoteDtoToNote(dto: PersistedNoteDto, authorId: string): Note{
        const automapped = automapper.map("PersistedNoteDto","Note",dto);
        automapped.authorId = authorId;
        return new Note(automapped);
    }*/
}