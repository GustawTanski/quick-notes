import NoteRepositoryPort from "../core/noteRepositoryPort";
import Note from "../core/domain/note";
import NoteMangooseModelMapper from "./models/noteMangooseModelMapper";
import { tsNeverKeyword } from "@babel/types";

export default class MongoDbNotesRepository implements NoteRepositoryPort{

    //mapper providing mangoose models used in DB manipulation
    noteMangooseModelMapper: NoteMangooseModelMapper = new NoteMangooseModelMapper();

    async save(note: Note): Promise<Note> {
        let noteModel = this.noteMangooseModelMapper.noteToMangooseModel(note);
        let savedNote = await noteModel.save();
        return this.noteMangooseModelMapper.mangooseModelToNote(savedNote);
    }
    
    async selectById(noteId: string, authorId: string): Promise<Note> {
        let NoteModel = this.noteMangooseModelMapper.NoteMangooseModel;
        let foundNote = await NoteModel.findById(noteId).find({authorId: authorId}).findOne();
        if(!foundNote){ throw new Error("Note not found"); }
        return this.noteMangooseModelMapper.mangooseModelToNote(foundNote);
    }

    async selectByAuthorId(authorId: string): Promise<Note[]> {
        let NoteModel = this.noteMangooseModelMapper.NoteMangooseModel;
        let foundNotes = await NoteModel.find({authorId: authorId});
        //maps all the notes to Note objects
        return foundNotes.map(
            this.noteMangooseModelMapper.mangooseModelToNote
            );
    }

    async delete(noteId: string): Promise<Note> {
        let NoteModel = this.noteMangooseModelMapper.NoteMangooseModel;
        let deletedNote = await NoteModel.findByIdAndRemove(noteId);
        if(!deletedNote){ throw new Error("Note not found"); }
        return this.noteMangooseModelMapper.mangooseModelToNote(deletedNote);
    }
}