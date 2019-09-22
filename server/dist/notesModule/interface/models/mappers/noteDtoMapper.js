"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var note_1 = __importDefault(require("../../../core/domain/note"));
require("automapper-ts/dist/automapper");
var persistedNoteDto_1 = __importDefault(require("../persistedNoteDto"));
var NoteDtoMapper = /** @class */ (function () {
    function NoteDtoMapper() {
        automapper.createMap("NewNoteDto", "Note");
        automapper.createMap("PersistedNoteDto", "Note");
        automapper.createMap("Note", "PersistedNoteDto").convertToType(persistedNoteDto_1.default);
    }
    NoteDtoMapper.prototype.noteToPersistedNoteDto = function (note) {
        return automapper.map("Note", "NoteDto", note);
    };
    NoteDtoMapper.prototype.newNoteDtoToNote = function (dto) {
        return new note_1.default(automapper.map("NewNoteDto", "Note", dto));
    };
    NoteDtoMapper.prototype.persistedNoteDtoToNote = function (dto) {
        return new note_1.default(automapper.map("PersistedNoteDto", "Note", dto));
    };
    return NoteDtoMapper;
}());
exports.default = NoteDtoMapper;
