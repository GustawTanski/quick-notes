import { Document } from "mongoose";

export default interface NoteMongooseModelInterface extends Document{
    _id: any,
    authorId: string,
    content: string
}