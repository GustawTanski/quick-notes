"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var noteService_1 = __importDefault(require("./core/service/noteService"));
var restInterface_1 = __importDefault(require("./interface/restInterface"));
var mongoDbNotesRepository_1 = __importDefault(require("./infrastructure/mongoDbNotesRepository"));
var notesModule = {
    NoteRepositoryImplementation: mongoDbNotesRepository_1.default,
    NoteServiceImplementation: noteService_1.default,
    init: function () {
        var repository = new this.NoteRepositoryImplementation();
        var service = new this.NoteServiceImplementation(repository);
        return new restInterface_1.default(service);
    }
};
exports.default = notesModule;
