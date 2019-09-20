import "automapper-ts/dist/automapper";
import mongoose, { Model, Schema } from "mongoose";
import Note from "../../core/domain/note";
import NoteMongooseModelInterface from "./noteMangooseModelInterface";

/**
 * Class responsible for generating NoteMangooseModel its instances objects used to manipulate the contents of MongoDb
 */
export default class NoteMangooseModelMapper{
    NoteMongooseModel: Model<NoteMongooseModelInterface>;
    schema: Schema;

    constructor(){
        this.schema = new Schema({},{strict: false});
        this.NoteMongooseModel = mongoose.model<NoteMongooseModelInterface>("Note",this.schema);

        automapper.createMap("Note","MongooseNote").forMember(
            "_id",(opts: AutoMapperJs.IMemberConfigurationOptions) => { opts.mapFrom('noteId'); }
        );

        automapper.createMap("MongooseNote","Note").forMember(
            "noteId",(opts: AutoMapperJs.IMemberConfigurationOptions) => { opts.mapFrom('_id'); }
        );
    }

    noteToMongooseModel(note: Note): NoteMongooseModelInterface{
        let mangooseNote: NoteMongooseModelInterface = automapper.map("Note","MongooseNote",note);
        return new this.NoteMongooseModel(mangooseNote);
    }

    mongooseModelToNote(mongooseModel: NoteMongooseModelInterface): Note{
        let automapperOutput = automapper.map("MongooseNote","Note",mongooseModel.toObject());
        return new Note(automapperOutput);
    }
}