"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("automapper-ts/dist/automapper");
var mongoose_1 = __importStar(require("mongoose"));
var note_1 = __importDefault(require("../../core/domain/note"));
/**
 * Class responsible for generating NoteMangooseModel its instances objects used to manipulate the contents of MongoDb
 */
var NoteMangooseModelMapper = /** @class */ (function () {
    function NoteMangooseModelMapper() {
        this.schema = new mongoose_1.Schema({}, { strict: false });
        this.NoteMongooseModel = mongoose_1.default.model("Note", this.schema);
        automapper.createMap("Note", "MongooseNote").forMember("_id", function (opts) { opts.mapFrom('noteId'); });
        automapper.createMap("MongooseNote", "Note").forMember("noteId", function (opts) { opts.mapFrom('_id'); });
    }
    NoteMangooseModelMapper.prototype.noteToMongooseModel = function (note) {
        var mangooseNote = automapper.map("Note", "MongooseNote", note);
        return new this.NoteMongooseModel(mangooseNote);
    };
    NoteMangooseModelMapper.prototype.mongooseModelToNote = function (mongooseModel) {
        var automapperOutput = automapper.map("MongooseNote", "Note", mongooseModel.toObject());
        return new note_1.default(automapperOutput);
    };
    return NoteMangooseModelMapper;
}());
exports.default = NoteMangooseModelMapper;
