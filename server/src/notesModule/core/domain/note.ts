import "reflect-metadata";
import * as jf from "joiful";

export default class Note{
    @jf.string()
    noteId?: string = undefined;

    @jf.string().required().min(1)
    authorId: string = "";
    
    @jf.string().required().min(1)
    title: string = "";

    @jf.string().required().min(3)
    content: string = "";

    @jf.string().required().pattern(new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"))
    color: string = "";

    /**
     * A cloning constructor that assigns all required atributes based on the object provided
     * @param base an object to be cloned
     */
    constructor(base: Note/*noteId:string|undefined,author:string|undefined,content:string|undefined*/){
        const { error } = jf.validateAsClass(base, Note);
        if(error){
            throw new Error(error.details[0].message);
        }

        this.noteId=base.noteId;
        this.authorId=base.authorId;
        this.title=base.title;
        this.content=base.content;
        this.color=base.color;
    }
}