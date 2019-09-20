import "automapper-ts/dist/automapper";
import mangoose, { Model, Schema } from "mongoose";
import Note from "../../core/domain/note";
import NoteMangooseModelInterface from "./noteMangooseModelInterface";

/**
 * Class responsible for generating NoteMangooseModel its instances objects used to manipulate the contents of MongoDb
 */
export default class NoteMangooseModelMapper{
    NoteMangooseModel: Model<NoteMangooseModelInterface>;
    schema: Schema;

    constructor(){
        this.schema = new Schema({},{strict: false});
        this.NoteMangooseModel = mangoose.model<NoteMangooseModelInterface>("Note",this.schema);

        automapper.createMap("Note","MangooseNote").forMember(
            "_id",(opts: AutoMapperJs.IMemberConfigurationOptions) => { opts.mapFrom('noteId'); }
        );

        automapper.createMap("MangooseNote","Note").forMember(
            "noteId",(opts: AutoMapperJs.IMemberConfigurationOptions) => { opts.mapFrom('_id'); }
        );
    }

    noteToMangooseModel(note: Note): NoteMangooseModelInterface{
        let mangooseNote: NoteMangooseModelInterface = automapper.map("Note","MangooseNote",note);
        return new this.NoteMangooseModel(mangooseNote);
    }

    mangooseModelToNote(mangooseModel: NoteMangooseModelInterface): Note{
        let automapperOutput = automapper.map("MangooseNote","Note",mangooseModel.toObject());
        return new Note(automapperOutput);
    }
}