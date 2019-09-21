import express, { Router, Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import NoteServicePort from "../core/noteServicePort";
import NewNoteDto from "./models/newNoteDto";
import { validate, validateAsClass } from "joiful";
import NoteDtoMapper from "./models/mappers/noteDtoMapper";
import auth from "../../middlewares/auth";

export default class RestInterface{
    private _router: Router;
    private _noteMapper: NoteDtoMapper;

    constructor(noteService: NoteServicePort){
        this._router = express.Router();
        this._noteMapper = new NoteDtoMapper();

        this.router.use(auth);
        this.router.use(express.json());

        this.router.get('/notes', asyncHandler(async (req, res, next) => {
            let userId = this.extractUserId(req);
            let notes = await noteService.selectNotesByAuthorId(userId);
            res.status(200).send(notes);
        }));

        this.router.get('/notes/:noteId', asyncHandler(async (req, res, next) => {
            let userId = this.extractUserId(req);
            let note = await noteService.selectNoteById(req.params.noteId,userId);
            res.status(200).send(note);
        }));

        this.router.delete('/notes/:noteId', asyncHandler(async (req, res, next) => {
            let userId = this.extractUserId(req);
            let note = await noteService.deleteNote(req.params.noteId, userId);
            res.status(200).send(note);
        }));

        this.router.post('/notes', asyncHandler(async (req, res, next) => {
            let noteDto: NewNoteDto = req.body;
            let userId = this.extractUserId(req);
            const { error } = validateAsClass(noteDto, NewNoteDto);
            if(error){
                throw new Error(error.details[0].message);
            }
            else{
                let newNote = await noteService.saveNote(this._noteMapper.newNoteDtoToNote(noteDto, userId));
                let noteResponse = this._noteMapper.noteToPersistedNoteDto(newNote);
                res.status(200).send(noteResponse);
            }
        }));

        /*this.router.put('/notes/:noteId', asyncHandler(async (req, res, next) => {
            let noteDto: PersistedNoteDto = req.body;
            noteDto.noteId = req.params.noteId;
            const { error, value } = validateAsClass(noteDto, PersistedNoteDto);
            if(error){
                throw new Error(error.details[0].message);
            }
            else{
                let newNote = await noteService.saveNote(this._noteMapper.persistedNoteDtoToNote(req.body));
                res.status(200).send(newNote);
            }
        }));*/

        /**
         * Error handler route.
         * TODO: throw better errors and handle them based on their type
         */
        this.router.use((error: Error, req: Request, res: Response, next: NextFunction)=>{
            if (error) {
                res.status(500).send(error.message);
            } else {
              next();
            }
        });
    }

    get router(): Router {
        return this._router;
    }

    extractUserId(req: Request): string {
        const jwtKey = process.env.JWT_SECRET;
        if(!jwtKey){ throw new Error("Server configuration error");}

        let userId;
        const token = req.header("x-auth-token");
        if(token && typeof token === "string"){
            const decoded = jwt.verify(token,jwtKey) as { _id:string };
            userId = decoded._id;
        }
        if(userId) {
            return userId;
        }
        else{
            throw new Error("Invalid authentication token, can't identify user");
        }
    }
}