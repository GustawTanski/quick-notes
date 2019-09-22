"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
require("reflect-metadata");
var jf = __importStar(require("joiful"));
var ts_enum_util_1 = require("ts-enum-util");
var color_1 = __importDefault(require("../../core/domain/color"));
var NewNoteDto = /** @class */ (function () {
    function NewNoteDto() {
        this.title = "";
        this.content = "";
        this.color = undefined;
    }
    __decorate([
        jf.string().required().min(1),
        __metadata("design:type", String)
    ], NewNoteDto.prototype, "title", void 0);
    __decorate([
        jf.string().required().min(3),
        __metadata("design:type", String)
    ], NewNoteDto.prototype, "content", void 0);
    __decorate([
        jf.string().required().valid(ts_enum_util_1.$enum(color_1.default).getKeys()),
        __metadata("design:type", Object)
    ], NewNoteDto.prototype, "color", void 0);
    return NewNoteDto;
}());
exports.default = NewNoteDto;
