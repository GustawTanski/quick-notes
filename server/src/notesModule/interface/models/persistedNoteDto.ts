import "reflect-metadata";
import * as jf from "joiful";

export default class PersistedNoteDto{
    @jf.string()
    noteId: string = "";

    @jf.string().required().min(1)
    authorId: string = "";
    
    @jf.string().required().min(3)
    content: string = "";
}