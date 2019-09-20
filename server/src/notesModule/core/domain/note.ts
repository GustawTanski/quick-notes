import "reflect-metadata";
import * as jf from "joiful";

export default class Note{
    @jf.string()
    noteId?: string = undefined;

    @jf.string().required().min(1)
    authorId: string = "";
    
    @jf.string().required().min(3)
    content: string = "";

    /**
     * A cloning constructor that assigns all required atributes based on the object provided
     * @param base an object to be cloned
     */
    constructor(base: Note/*noteId:string|undefined,author:string|undefined,content:string|undefined*/){
        this.noteId=base.noteId;
        this.authorId=base.authorId;
        this.content=base.content;
    }
}