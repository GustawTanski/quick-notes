import "reflect-metadata";
import * as jf from "joiful";
import Color from "./color";
import { $enum } from "ts-enum-util";

export default class Note{
    @jf.string()
    noteId?: string;

    @jf.string().required().min(1)
    authorId: string;
    
    @jf.string().required().min(1)
    title: string;

    @jf.string().required().min(3)
    content: string;

    @jf.string().required().valid($enum(Color).getKeys())
    color: keyof typeof Color;

    /**
     * A cloning constructor that assigns all required atributes based on the object provided
     * @param base an object to be cloned
     */
    constructor(base: Note){
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