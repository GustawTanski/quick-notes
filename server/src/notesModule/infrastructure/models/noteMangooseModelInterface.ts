import { Document } from "mongoose";

export default interface NoteMangooseModelInterface extends Document{
    _id: any,
    authorId: string,
    content: string
}