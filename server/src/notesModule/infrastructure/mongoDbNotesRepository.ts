import NoteRepositoryPort from "../core/noteRepositoryPort";
import Note from "../core/domain/note";
import NoteMangooseModelMapper from "./models/noteMangooseModelMapper";

export default class MongoDbNotesRepository implements NoteRepositoryPort{

    //mapper providing mongoose models used in DB manipulation
    noteMongooseModelMapper = new NoteMangooseModelMapper();

    async save(note: Note): Promise<Note> {
        let noteModel = this.noteMongooseModelMapper.noteToMongooseModel(note);
        let savedNote = await noteModel.save();
        return this.noteMongooseModelMapper.mongooseModelToNote(savedNote);
    }
    
    async selectById(noteId: string, authorId: string): Promise<Note> {
        let NoteModel = this.noteMongooseModelMapper.NoteMongooseModel;
        let foundNote = await NoteModel.findById(noteId).find({authorId: authorId}).findOne();
        if(!foundNote){ throw new Error("Note not found"); }
        return this.noteMongooseModelMapper.mongooseModelToNote(foundNote);
    }

    async selectByAuthorId(authorId: string): Promise<Note[]> {
        let NoteModel = this.noteMongooseModelMapper.NoteMongooseModel;
        let foundNotes = await NoteModel.find({authorId: authorId});
        //maps all the notes to Note objects
        return foundNotes.map(
            this.noteMongooseModelMapper.mongooseModelToNote
            );
    }

    async delete(noteId: string): Promise<Note> {
        let NoteModel = this.noteMongooseModelMapper.NoteMongooseModel;
        let deletedNote = await NoteModel.findByIdAndRemove(noteId);
        if(!deletedNote){ throw new Error("Note not found"); }
        return this.noteMongooseModelMapper.mongooseModelToNote(deletedNote);
    }
}