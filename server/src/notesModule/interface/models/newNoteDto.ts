import "reflect-metadata";
import * as jf from "joiful";

export default class NewNoteDto{
    @jf.string().required().min(1)
    title: string = "";

    @jf.string().required().min(3)
    content: string = "";

    @jf.string().required().pattern(new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"))
    color: string = "";
}